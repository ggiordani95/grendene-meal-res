import { HttpClient } from "../http/types/http-client.types";
import { Api } from "./api";

export function createApi(baseURL: string,client: HttpClient,headers = {}) {
    return new Api(baseURL, client, headers);
}