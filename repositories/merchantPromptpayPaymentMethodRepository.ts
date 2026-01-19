
import { BaseRepository } from "./baseRepository";

export class MerchantPromptpayPaymentMethodRepository extends BaseRepository {
  async getMerchantPromptpayPaymentMethods(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-promptpay-payment-method-public`)
    
    return data
  }

  async getMerchantPromptpayPaymentMethod(id: number | string): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-promptpay-payment-method-public/${id}`)
    
    return data
  }
}

export default MerchantPromptpayPaymentMethodRepository;
