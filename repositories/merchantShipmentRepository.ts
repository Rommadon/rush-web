
import { BaseRepository } from "./baseRepository";

export class MerchantShipmentRepository extends BaseRepository {
  async getMerchantShipments(): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-shipment-public`)
    
    return data
  }

  async getMerchantShipment(id: number | string): Promise<any> {
    const { data } = await this.fetcher.get(`/merchant-shipment-public/${id}`)
    
    return data
  }
}

export default MerchantShipmentRepository;
