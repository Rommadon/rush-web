import { BaseRepository } from "./baseRepository";

export class CartRepository extends BaseRepository {
  async getCart(): Promise<any> {
    const { data } = await this.fetcher.get(`/cart-public`)
    
    return data
  }
}

export default CartRepository;
