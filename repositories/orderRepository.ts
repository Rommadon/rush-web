
import { BaseRepository } from "./baseRepository";

export class OrderRepository extends BaseRepository {
  async getOrders({ page = 1, limit = 10, withPagination = "true", number = "", status = "" }): Promise<any>  {
    const url = `/order-public?withPagination=${withPagination}&page=${page}&limit=${limit}&number=${number}&status=${status}`;
    const { data } = await this.fetcher.get(encodeURI(url))

    return data;
  }

  async getOrder(id: number | string | any): Promise<any> {
    const { data } = await this.fetcher.get(`/order-public/${id}`)

    return data
  }

  async getLinkPay(uuid: string | any): Promise<any> {
    const { data } = await this.fetcher.get(`/order-public/link-pay/${uuid}`)

    return data
  }
}

export default OrderRepository;
