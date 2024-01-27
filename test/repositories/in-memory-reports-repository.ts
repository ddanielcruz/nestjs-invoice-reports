import { randomUUID } from 'node:crypto'

import { Report, ReportStatus } from '@/report/report.entity'
import {
  CreateReportInput,
  ReportsRepository,
  UpdateReportInput,
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

  async update(id: string, report: UpdateReportInput): Promise<Report> {
    const reportIndex = this.items.findIndex((report) => report.id === id)

    if (reportIndex === -1) {
      throw new Error('Report not found')
    }

    const updatedReport = {
      ...this.items[reportIndex],
      ...report,
    }

    this.items[reportIndex] = updatedReport

    return updatedReport
  }
}
