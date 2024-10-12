import axios, { Method } from 'axios';
import { HttpClient } from './types/http-client.types';

export class AxiosClient implements HttpClient {
  async request<RequestType, ResponseType>(
    url: string,
    method: Method,
    headers: Record<string, string>,
    data?: RequestType
  ): Promise<ResponseType> {
    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    return response.data as ResponseType;
  }
}
