import { Report } from '../report.entity'
import { ReportsRepository } from '../report.repository'

export type ListReportsRequest = { userId: string }

export type ListReportsResponse = { reports: Report[] }

export class ListReports {
  constructor(private readonly reportRepository: ReportsRepository) {}

  async execute({ userId }: ListReportsRequest): Promise<ListReportsResponse> {
    const reports = await this.reportRepository.fetchByUserId(userId)
    return { reports }
  }
}
