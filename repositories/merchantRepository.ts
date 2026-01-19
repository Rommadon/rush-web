import { BaseRepository } from "./baseRepository";

export class MerchantRepository extends BaseRepository {
  getMerchant() {
    const url = `/merchant-public`;

    return this.fetcher.get(url);
  }
}
