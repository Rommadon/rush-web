
import { BaseRepository } from "./baseRepository";

export class MerchantOmiseIntegrationRepository extends BaseRepository {
  async getMerchantOmiseIntegration(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-omise-integration-public`)

    return data
  }
}

export default MerchantOmiseIntegrationRepository;
