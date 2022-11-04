import { createAsyncThunk } from "@reduxjs/toolkit";
import { getArticles } from "../../api/articles";
import { ArticleParams } from "../../api/types";
export const fetchHomeMultidataAction:any = createAsyncThunk(
  "blog/getBlogList",
  async (params: ArticleParams) => {
    const data = await getArticles(params);
    return data;
  }
);
