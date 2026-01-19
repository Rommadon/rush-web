import { BaseRepository } from "src/core/repositories";

export class VoucherRepository extends BaseRepository {
  async allActive(): Promise<any> {
    const { data } = await this.fetcher.get(`/voucher-public?status=pending,prepare`)
    
    return data
  }

  async allInActive(): Promise<any> {
    const { data } = await this.fetcher.get(`/voucher-public?status=completed,expired,cancelled`)
    
    return data
  }

  async getById(id: number): Promise<any> {
    const { data } = await this.fetcher.get(`/voucher-public/${id}`)
    
    return data
  }
}

export default VoucherRepository;
