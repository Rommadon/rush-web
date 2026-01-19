import { BaseRepository } from "./baseRepository";

export type CatalogsQuery = {
  page?: any;
  limit?: any;
  withPagination?: string;
  orderBy?: any;
};

export type CatalogQuery = {
  id: any,
  page?: any;
  limit?: any;
  withPagination?: string;
  orderBy?: any;
}

export class CatalogRepository extends BaseRepository {
  async getCatalogs({ page = 1, limit = 10, withPagination = "true", orderBy = "default" }: CatalogsQuery): Promise<any> {
    const { data } = await this.fetcher.get(`/product-catalog-public?withPagination=${withPagination}&page=${page}&limit=${limit}&orderBy=${orderBy}`)
    
    return data
  }

  async getCatalog({ id, page = 1, limit = 10, withPagination = "true", orderBy = "default"} : CatalogQuery): Promise<any> {
    const { data } = await this.fetcher.get(`/product-catalog-public/${id}?withPagination=${withPagination}&page=${page}&limit=${limit}&orderBy=${orderBy}`)
    
    return data
  }
}

export default CatalogRepository;
