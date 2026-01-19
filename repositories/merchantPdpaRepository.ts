import { BaseRepository } from "./baseRepository";

export class MerchantPdpaRepository extends BaseRepository {
  async getMerchantPdpa(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-pdpa-public`)

    return data
  }
}

export default MerchantPdpaRepository;
