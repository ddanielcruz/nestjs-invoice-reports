import { Module } from '@nestjs/common'

import { QueueModule } from '@/queue/queue.module'

import { FetchReportsController } from './controllers/fetch-reports.controller'
import { FetchReportsService } from './services/fetch-reports.service'

@Module({
  imports: [QueueModule],
  controllers: [FetchReportsController],
  providers: [FetchReportsService],
})
export class ReportModule {}
