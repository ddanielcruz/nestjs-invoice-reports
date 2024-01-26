import { Report } from '@/report/report.entity'
import { ReportRepository } from '@/report/report.repository'

export class InMemoryReportsRepository implements ReportRepository {
  items: Report[] = []

  async fetchByUserId(userId: string): Promise<Report[]> {
    return this.items.filter((report) => report.userId === userId)
  }
}
