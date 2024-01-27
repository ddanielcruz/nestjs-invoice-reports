import { Body, Controller, Post } from '@nestjs/common'

import { User, UserData } from '@/auth/user.decorator'

import { CreateReportDto } from '../dtos/create-report.dto'
import { CreateReportService } from '../services/create-report'

@Controller('reports')
export class CreateReportController {
  constructor(private readonly createReportService: CreateReportService) {}

  @Post()
  async handle(@Body() body: CreateReportDto, @User() user: UserData) {
    return await this.createReportService.execute({
      ...body,
      userId: user.id,
    })
  }
}
