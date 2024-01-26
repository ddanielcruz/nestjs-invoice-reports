import { Optional } from '@/core/types/optional'

import { Report } from './report.entity'

export type CreateReportInput = Optional<Report, 'id' | 'status' | 'createdAt'>

export abstract class ReportsRepository {
  abstract create(report: CreateReportInput): Promise<Report>
  abstract fetchByUserId(userId: string): Promise<Report[]>
}
