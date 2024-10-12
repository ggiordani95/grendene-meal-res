export interface HttpClient {
    request<RequestType, ResponseType>(
      url: string,
      method: string,
      headers: Record<string, string>,
      data?: RequestType
    ): Promise<ResponseType>;
  }