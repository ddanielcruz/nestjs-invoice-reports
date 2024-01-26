import { Module } from '@nestjs/common'

import { FetchReportsController } from './controllers/fetch-reports.controller'
import { FetchReportsService } from './services/fetch-reports.service'

@Module({
  controllers: [FetchReportsController],
  providers: [FetchReportsService],
})
export class ReportModule {}
