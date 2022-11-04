export interface IArticleInfo {
  code: number;
  data: {
    datalist: Array<any>
    total: string;
  };
  message: string;
}
export interface ArticleParams {
  pageSize: number;
  pageNum: number;
  lately?: string;
  id?: string;
  article_type?: string;
  key?: string;
}
