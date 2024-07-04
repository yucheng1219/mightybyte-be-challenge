import 'dotenv/config'
import { z } from 'zod'

export const ZEnv = z.object({
  PORT: z.number().min(1),
})

export const zEnv = ZEnv.parse({
  PORT: Number(process.env.PORT || 3000),
})
