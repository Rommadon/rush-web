
import { BaseRepository } from "./baseRepository";

export class ArticleRepository extends BaseRepository {
  
  async getArticles({ page = 1, limit = 10, withPagination = "true", tag = "" }): Promise<any> {
    const url = `/article-public?withPagination=${withPagination}&page=${page}&limit=${limit}&tag=${tag}`
    const { data } = await this.fetcher.get(encodeURI(url))

    return data
  }

  async getArticle({ slug = "" }): Promise<any> {
    const { data } = await this.fetcher.get(`/article-public/${slug}`)
    
    return data
  }
}

export default ArticleRepository;
