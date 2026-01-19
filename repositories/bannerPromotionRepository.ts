import { BaseRepository } from "./baseRepository";

export class BannerPromotionRepository extends BaseRepository {
  async getBannerPromotions(): Promise<any> {
    const { data } = await this.fetcher.get(`/banner-promotion-public`)
    
    return data
  }

  async getBannerPromotion(id: number): Promise<any> {
    const { data } = await this.fetcher.get(`/banner-promotion-public/${id}`)
    
    return data
  }
}

export default BannerPromotionRepository;
