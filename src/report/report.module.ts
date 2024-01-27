import { Module } from '@nestjs/common'

import { QueueModule } from '@/queue/queue.module'

import { ProcessReportConsumer } from './consumers/process-report.consumer'
import { CreateReportController } from './controllers/create-report.controller'
import { FetchReportsController } from './controllers/fetch-reports.controller'
import { CreateReportService } from './services/create-report'
import { FetchReportsService } from './services/fetch-reports.service'

@Module({
  imports: [QueueModule],
  controllers: [FetchReportsController, CreateReportController],
  providers: [FetchReportsService, CreateReportService, ProcessReportConsumer],
})
export class ReportModule {}
