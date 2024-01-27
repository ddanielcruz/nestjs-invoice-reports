import { Injectable } from '@nestjs/common'

import { QueueEvent } from '@/queue/queue.constants'
import { QueueRepository } from '@/queue/queue.repository'

import { Report } from '../report.entity'
import { ReportsRepository } from '../report.repository'

export type CreateReportRequest = {
  userId: string
  url: string
}

export type CreateReportResponse = {
  report: Report
}

@Injectable()
export class CreateReportService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly queueRepository: QueueRepository,
  ) {}

  async execute({
    userId,
    url,
  }: CreateReportRequest): Promise<CreateReportResponse> {
    const report = await this.reportsRepository.create({ userId, url })
    await this.queueRepository.add(QueueEvent.ProcessReport, {
      reportId: report.id,
    })

    return { report }
  }
}
