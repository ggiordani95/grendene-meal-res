import { HttpClient } from "../http/types/http-client.types";

export class Api {
  private baseURL: string;
  private headers: any;
  private client: HttpClient;

  constructor(baseURL: string, client: HttpClient, headers = {}) {
    this.baseURL = baseURL;
    this.headers = headers;
    this.client = client;
  }

  async request<RequestType, ResponseType>(
    endpoint: string,
    method: string = 'POST',
    data?: RequestType
  ): Promise<ResponseType> {
    const url = `${this.baseURL}${endpoint}`;
    return this.client.request<RequestType, ResponseType>(url, method, this.headers, data);
  }

  async get<ResponseType>(endpoint: string): Promise<ResponseType> {
    return this.request<null, ResponseType>(endpoint, 'GET');
  }

  async post<RequestType, ResponseType>(endpoint: string, data: RequestType): Promise<ResponseType> {
    return this.request<RequestType, ResponseType>(endpoint, 'POST', data);
  }
}
