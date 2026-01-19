import { BaseRepository } from "src/core/repositories";

export class CouponRepository extends BaseRepository {
  async all(): Promise<any> {
    const { data } = await this.fetcher.get(`/coupon-public`)
    
    return data
  }

  async allActive(): Promise<any> {
    const { data } = await this.fetcher.get(`/coupon-public/activeCustomerCoupon`)
    
    return data
  }

  async allInActive(): Promise<any> {
    const { data } = await this.fetcher.get(`/coupon-public/inActiveCustomerCoupon`)
    
    return data
  }

  async allWithOutCustomerKeep(code: any): Promise<any> {
    const { data } = await this.fetcher.get(`/coupon-public/getAllWithOutCustomerKeep?code=${code || ''}`)
    
    return data
  }
}

export default CouponRepository;
