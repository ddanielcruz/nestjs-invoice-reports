import { Injectable } from '@nestjs/common'

import { Report } from '../report.entity'
import { ReportsRepository } from '../report.repository'

export type FetchReportsRequest = { userId: string }

export type FetchReportsResponse = { reports: Report[] }

@Injectable()
export class FetchReportsService {
  constructor(private readonly reportRepository: ReportsRepository) {}

  async execute({
    userId,
  }: FetchReportsRequest): Promise<FetchReportsResponse> {
    const reports = await this.reportRepository.fetchByUserId(userId)
    return { reports }
  }
}
