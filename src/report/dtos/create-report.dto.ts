import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const createReportSchema = z.object({
  url: z.string().url(),
})

export class CreateReportDto extends createZodDto(createReportSchema) {}
