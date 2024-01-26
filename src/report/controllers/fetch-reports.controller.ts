import { Controller, Get } from '@nestjs/common'

import { User, UserData } from '@/auth/user.decorator'

import { FetchReportsService } from '../services/fetch-reports.service'

@Controller('/reports')
export class FetchReportsController {
  constructor(private readonly fetchReportsService: FetchReportsService) {}

  @Get()
  async handle(@User() user: UserData) {
    return await this.fetchReportsService.execute({ userId: user.id })
  }
}
