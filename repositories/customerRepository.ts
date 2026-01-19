
import { BaseRepository } from "./baseRepository";

export class CustomerRepository extends BaseRepository {
  async getCustomer(): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public`)
    
    return data
  }

  async getCustomerWallet({ page = 1, limit = 10, withPagination = "true", type = "" }): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public/customerWallet?withPagination=${withPagination}&page=${page}&limit=${limit}&type=${type}`)
    
    return data
  }
}

export default CustomerRepository;
