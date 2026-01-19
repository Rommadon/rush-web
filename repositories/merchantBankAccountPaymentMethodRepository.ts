
import { BaseRepository } from "./baseRepository";

export class MerchantBankAccountPaymentMethodRepository extends BaseRepository {
  async getMerchantBankAccountPaymentMethods(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-bank-account-payment-method-public`)
    
    return data
  }

  async getMerchantBankAccountPaymentMethod(id: number | string): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-bank-account-payment-method-public/${id}`)
    
    return data
  }
}

export default MerchantBankAccountPaymentMethodRepository;
