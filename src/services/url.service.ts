class UrlService {
  private urlMap: Map<string, string> = new Map()
  private undeliveredMap: Map<string, string> = new Map()
  constructor() {}

  saveUrl = ({
    url,
    token,
    shortenedURL,
  }: {
    url: string
    token: string
    shortenedURL: string
  }): Promise<void> => {
    this.urlMap.set(token, url)
    this.undeliveredMap.set(token, shortenedURL)
    return Promise.resolve()
  }

  getUrl = (token: string): Promise<string | undefined> => {
    return Promise.resolve(this.urlMap.get(token))
  }

  getUndeliveredUrls = (): Promise<string[]> => {
    return Promise.resolve(Array.from(this.undeliveredMap.values()))
  }

  markDelivered = (token: string): Promise<boolean> => {
    return Promise.resolve(this.undeliveredMap.delete(token))
  }
}

export const urlService = new UrlService()
