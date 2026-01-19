import { BaseRepository } from "./baseRepository";

export class BannerMerchantRepository extends BaseRepository {
  async getBannerMerchants(): Promise<any> {
    const { data } = await this.fetcher.get(`/banner-merchant-public`)
    
    return data
  }
}

export default BannerMerchantRepository;
