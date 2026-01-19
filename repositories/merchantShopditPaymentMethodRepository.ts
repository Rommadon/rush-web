import { BaseRepository } from "./baseRepository";

export class MerchantShopditPaymentMethodRepository extends BaseRepository {
  async getMerchantShopditPaymentMethods(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-shopdit-payment-method-public`)
    
    return data
  }

  async getMerchantShopditPaymentMethod(id: number | string): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-shopdit-payment-method-public/${id}`)
    
    return data
  }
}

export default MerchantShopditPaymentMethodRepository;
