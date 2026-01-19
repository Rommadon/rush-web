
import { BaseRepository } from "./baseRepository";

export class MerchantCashPaymentMethodRepository extends BaseRepository {
  async getMerchantCashPaymentMethods(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-cash-payment-method-public`)
    
    return data
  }

  async getMerchantCashPaymentMethod(id: number | string): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-cash-payment-method-public/${id}`)
    
    return data
  }
}

export default MerchantCashPaymentMethodRepository;
