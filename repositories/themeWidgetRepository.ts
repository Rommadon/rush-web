import { BaseRepository } from "./baseRepository";

export class ThemeWidgetRepository extends BaseRepository {
  async getThemeWidget(): Promise<any> {
    const { data } = await this.fetcher.get(`/theme-widget-public`);

    return data;
  }
}

export default ThemeWidgetRepository;
