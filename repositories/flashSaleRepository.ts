
import { BaseRepository } from "./baseRepository";

export class FlashSaleRepository extends BaseRepository {
  async getFlashSales(): Promise<any> {
    const { data } = await this.fetcher.get(`/flash-sale-public`)
    
    return data
  }

  async getFlashSale(id: number): Promise<any> {
    const { data } = await this.fetcher.get(`/flash-sale-public/${id}`)
    
    return data
  }
}

export default FlashSaleRepository;
