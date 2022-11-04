import { createSlice } from "@reduxjs/toolkit";

import * as midgardActions from "./actions";

const initialState = {
  initialState: {
    blogList: {
      datalist: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      isLoading: false,
    },
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      midgardActions.fetchHomeMultidataAction.fulfilled,
      (state, { payload ,meta}) => {
        const { data } = payload.data;
        const {pageSize,pageNum} = meta.arg
        state.initialState.blogList = {
          datalist: data.datalist,
          total: parseInt(data.total),
          isLoading: false,
          pageSize,
          pageNum,
        };
      }
    );
  },
});

export const { reducer, actions } = slice;
export const blogCount = (state) => {
  return state.blog?.initialState.blogList;
};
export default slice;
