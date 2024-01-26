import { Report } from '@/report/report.entity'
import { ReportsRepository } from '@/report/report.repository'

export class InMemoryReportsRepository implements ReportsRepository {
  items: Report[] = []

  async fetchByUserId(userId: string): Promise<Report[]> {
    return this.items.filter((report) => report.userId === userId)
  }
}
