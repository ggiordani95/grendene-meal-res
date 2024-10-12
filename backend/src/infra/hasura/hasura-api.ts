import { env } from '../../env';
import { HasuraClient } from '../../http/hasura-client';
import { Api } from '../api';

export class HasuraAPI extends Api {
  constructor(baseURL: string, adminSecret: string, headers = {}) {
    const hasuraClient = new HasuraClient(adminSecret); 
    super(baseURL, hasuraClient, headers);
  }
}

export const hasuraApi = new HasuraAPI(env.HASURA_URL, env.HASURA_ADMIN_SECRET);