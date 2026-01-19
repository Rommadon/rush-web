
import { BaseRepository } from "./baseRepository";

export class CustomerAddressRepository extends BaseRepository {
  async getCustomerAddresses(): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public/customerAddress`)
    
    return data
  }

  async getCustomerAddress(id: any): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public/customerAddress/${id}`)
    
    return data
  }
}

export default CustomerAddressRepository;
