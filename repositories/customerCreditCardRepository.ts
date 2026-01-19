
import { BaseRepository } from "./baseRepository";

export class CustomerCreditCardRepository extends BaseRepository {
  async getCustomerCreditCards(): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public/customerCreditCard`)
    
    return data
  }

  async getCustomerCreditCard(id: any): Promise<any> {
    const { data } = await this.fetcher.get(`/customer-public/customerCreditCard/${id}`)
    
    return data
  }
}

export default CustomerCreditCardRepository;
