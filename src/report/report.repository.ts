import { Report } from './report.entity'

export abstract class ReportRepository {
  abstract fetchByUserId(userId: string): Promise<Report[]>
}
