import { randomUUID } from 'node:crypto'

import { Report, ReportStatus } from '@/report/report.entity'
import {
  CreateReportInput,
  ReportsRepository,
} from '@/report/report.repository'

export class InMemoryReportsRepository implements ReportsRepository {
  items: Report[] = []

  async create(report: CreateReportInput): Promise<Report> {
    const newReport: Report = {
      id: randomUUID(),
      status: ReportStatus.pending,
      createdAt: new Date(),
      ...report,
    }

    this.items.push(newReport)

    return newReport
  }

  async fetchByUserId(userId: string): Promise<Report[]> {
    return this.items.filter((report) => report.userId === userId)
  }
}
