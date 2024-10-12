import axios, { Method } from 'axios';
import { HttpClient } from './types/http-client.types';

export class HasuraClient implements HttpClient {
  private adminSecret: string;

  constructor(adminSecret: string) {
    this.adminSecret = adminSecret;
  }

  async request<RequestType, ResponseType>(
    url: string,
    method: Method,
    headers: Record<string, string> = {},
    data?: RequestType
  ): Promise<ResponseType | any> {
    try {
      if (!url) {
        throw new Error('A URL para a requisição é inválida ou está faltando.');
      }
      const response = await axios({
        url,
        method,
        headers: {
          ...headers,
          'x-hasura-admin-secret': this.adminSecret,
          'Content-Type': 'application/json',
        },
        data,
      });
  
      return response.data as ResponseType;
    } catch (error:any) {
      if (error.response) {
        console.error('Erro do Hasura:', error.response.data);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
    }
    
  }
}
