import Axios from "axios"

export class BaseRepository {
  protected fetcher = Axios

  constructor(accessToken: string, host: string | undefined) {
    this.fetcher.defaults.baseURL = `${process.env.INTERNAL_API_HOST}`
    if (accessToken) {
      this.fetcher.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }

    if (host && ['lvh', 'staging.myshopdit', 'myshopdit', 'rushbps'].includes(host.split('.').slice(1, -1).join('.'))) {
      this.fetcher.defaults.headers.common['CurrentMerchantSlug'] = host.split('.')[0];
      delete this.fetcher.defaults.headers.common['CurrentMerchantDomain'];
    } else {
      this.fetcher.defaults.headers.common['CurrentMerchantSlug'] = '';
      if (host && !host.includes('myshopdit.com')) {
        this.fetcher.defaults.headers.common['CurrentMerchantDomain'] = host.split('/')[0].replace('www.', '');
      }
    }

    if (process.env.NODE_ENV === "development") {
      this.fetcher.interceptors.request.use((config: any) => {
        const url = config.baseURL + config.url
        const method = config.method.toUpperCase()

        console.log(new Date().toISOString(), `request: [${method}] ${url}`)

        return config
      })
    }
  }
}
