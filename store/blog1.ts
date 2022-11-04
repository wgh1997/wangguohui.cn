import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles } from "../api/articles";
import { ArticleParams } from "../api/types";

export const slice = createSlice({
  name: "blog",
  initialState: {
    blogList: {
      datalist: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      isLoading: false,
    },
    newestList: {
      datalist: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      isLoading: false,
    },
  },
  reducers: {
    setisLoading: (state) => {
      state.blogList = {
        ...state.blogList,
        isLoading: true,
      };
    },
    getBlogList: (state, action) => {
      const { data, pageSize, pageNum } = action.payload;
      state.blogList = {
        ...state.blogList,
        datalist: data.datalist,
        total: data.total,
        isLoading: false,
        pageSize,
        pageNum,
      };
    },
    errorBlogList: (state) => {
      state.blogList = {
        ...state.blogList,
        isLoading: false,
      };
    },
    setNewestList: (state) => {
      state.newestList = {
        ...state.newestList,
        isLoading: true,
      };
    },
    getNewestList: (state, action: PayloadAction<any>) => {
      const { data, pageSize, pageNum } = action.payload;
      state.newestList = {
        ...state.newestList,
        datalist: data.datalist,
        total: data.total,
        isLoading: false,
        pageSize,
        pageNum,
      };
    },
    errorNewestList: (state) => {
      state.newestList = {
        ...state.newestList,
        isLoading: false,
      };
    },
  },
});

export const {
  getBlogList,
  setisLoading,
  errorBlogList,
  errorNewestList,
  getNewestList,
  setNewestList,
} = slice.actions;

export const BlogListAsync =
  (params: ArticleParams) =>
  async (dispatch: any): Promise<void> => {
    console.log(getBlogList.type);
    try {
      const { data } = await getArticles(params);
      dispatch(
        getBlogList({
          ...data,
          pageSize: params.pageSize,
          pageNum: params.pageNum,
        })
      );
    } catch (err) {
      dispatch(errorBlogList());
    }
  };

export const NewestListAsync = (params: ArticleParams) => async (dispatch) => {
  dispatch(setNewestList());
  try {
    const { data } = await getArticles(params);
    dispatch(
      getNewestList({
        ...data,
        pageSize: params.pageSize,
        pageNum: params.pageNum,
      })
    );
  } catch (err) {
    dispatch(errorNewestList());
  }
};

export const blogCount = (state) => {
  return state.blog?.blogList;
};
export const newestCount = (state) => {
  return state.blog?.newestList;
};
export default slice.reducer;
