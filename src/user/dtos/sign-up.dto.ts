import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(6),
})

export class SignUpDto extends createZodDto(signUpSchema) {}
