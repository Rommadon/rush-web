import { BaseRepository } from "./baseRepository";

export class ProductBrandRepository extends BaseRepository {
  async getProductCategories({ page = 1, limit = 10, withPagination = "true", status = "", name = "" }): Promise<any> {
    const { data } = await this.fetcher.get(`/product-brand-public?withPagination=${withPagination}&page=${page}&limit=${limit}&status=${status}&name=${name}`)
    
    return data
  }
}

export default ProductBrandRepository;
