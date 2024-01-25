import { z } from 'zod'

export const configSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url(),
  SALT_ROUNDS: z.coerce.number().default(10),
})

export type Config = z.infer<typeof configSchema>
