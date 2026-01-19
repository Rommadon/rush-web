
import { BaseRepository } from "./baseRepository";

export class DirectNotificationRepository extends BaseRepository {
  async getDirectNotifications({ page = 1, limit = 10, withPagination = "true", detailType = "" }): Promise<any>  {
    const url = `/direct-notification-public?withPagination=${withPagination}&page=${page}&limit=${limit}&detailType=${detailType}`;
    const { data } = await this.fetcher.get(encodeURI(url))

    return data;
  }

  async getDirectNotificationBroadcasts({ page = 1, limit = 10, withPagination = "true" }): Promise<any>  {
    const url = `/direct-notification-public/broadcast?withPagination=${withPagination}&page=${page}&limit=${limit}`;
    const { data } = await this.fetcher.get(encodeURI(url))

    return data;
  }
}

export default DirectNotificationRepository;
