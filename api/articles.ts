import { AxiosResponse } from 'axios'
import request from '@/utils/request'
import { IArticleInfo, ArticleParams } from './types'

export const getArticles = (params: ArticleParams): Promise<AxiosResponse<IArticleInfo>> =>
  request.get(`/api/article/text`, { params })
export const getClassify = (): Promise<AxiosResponse<IArticleInfo>> =>
  request.get(`/api/article/classify`)