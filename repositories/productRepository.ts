
import { BaseRepository } from "./baseRepository";

export type ProductQuery = {
  page?: any;
  limit?: any;
  withPagination?: string;
  productCategoryIds?: any;
  productBrandIds?: any;
  productCatalogIds?: any;
  search?: any;
  orderBy?: any;
};

export class ProductRepository extends BaseRepository {
  async getProducts({ page = 1, limit = 10, withPagination = "true", productCategoryIds = "", productBrandIds = "", productCatalogIds = "", search = "", orderBy = "default" }: ProductQuery): Promise<any> {
    const { data } = await this.fetcher.get(encodeURI(`/product-public?withPagination=${withPagination}&page=${page}&limit=${limit}${productBrandIds !== '' ? `&productBrandIds=${productBrandIds}` : ''}${productCategoryIds !== '' ? `&productCategoryIds=${productCategoryIds}` : ''}${productCatalogIds !== '' ? `&productCatalogIds=${productCatalogIds}` : ''}&search=${search}&orderBy=${orderBy}`))
    
    return data
  }

  async getBestSellerProducts({ page = 1, limit = 10, withPagination = "true" }): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/bestSeller?withPagination=${withPagination}&page=${page}&limit=${limit}`)
    
    return data
  }

  async getNewProducts({ page = 1, limit = 10, withPagination = "true" }): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/new?withPagination=${withPagination}&page=${page}&limit=${limit}`)
    
    return data
  }

  async getDiscountProducts({ page = 1, limit = 10, withPagination = "true" }): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/discount?withPagination=${withPagination}&page=${page}&limit=${limit}`)
    
    return data
  }

  async getRecommendProducts({ page = 1, limit = 10, withPagination = "true" }): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/recommend?withPagination=${withPagination}&page=${page}&limit=${limit}`)
    
    return data
  }

  async getProduct(slug?: any): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/${slug}`)
    
    return data
  }

  async getProductsRelation(slug?: any): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/${slug}/relationProducts`)
    
    return data
  }

  async getProductsRePurchase(): Promise<any> {
    const { data } = await this.fetcher.get(`/product-public/getProductsRePurchase`)
    
    return data
  }
}

export default ProductRepository;
