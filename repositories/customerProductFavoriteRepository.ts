
import { BaseRepository } from "./baseRepository";

export class CustomerProductFavoriteRepository extends BaseRepository {
  async getCustomerProductFavorites(): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-product-favorite-public`)
    
    return data
  }
}

export default CustomerProductFavoriteRepository;
