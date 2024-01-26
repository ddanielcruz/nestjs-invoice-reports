import { Report } from './report.entity'

export abstract class ReportsRepository {
  abstract fetchByUserId(userId: string): Promise<Report[]>
}
