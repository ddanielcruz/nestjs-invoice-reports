import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'

import { QueueEvent } from '@/queue/queue.constants'

import { ReportStatus } from '../report.entity'
import { ReportsRepository } from '../report.repository'

type ProcessReportRequest = {
  reportId: string
}

@Processor('reports')
export class ProcessReportConsumer {
  private readonly logger = new Logger(ProcessReportConsumer.name)

  constructor(private readonly reportsRepository: ReportsRepository) {}

  @Process(QueueEvent.ProcessReport)
  async execute(job: Job<ProcessReportRequest>) {
    this.logger.log(`Processing report ${job.data.reportId}`)
    const { reportId } = job.data

    await this.reportsRepository.update(reportId, {
      status: ReportStatus.processing,
    })

    try {
      // Do some heavy processing here
      await this.reportsRepository.update(reportId, {
        status: ReportStatus.completed,
      })
    } catch (error) {
      await this.reportsRepository.update(reportId, {
        status: ReportStatus.failed,
      })

      throw error
    }
  }
}
