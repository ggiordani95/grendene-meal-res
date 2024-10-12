import { z } from 'zod';

const envSchema = z.object({
    HASURA_URL: z.string(),
    HASURA_ADMIN_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);