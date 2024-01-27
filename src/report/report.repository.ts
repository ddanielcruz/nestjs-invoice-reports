import { Optional } from '@/core/types/optional'

import { Report } from './report.entity'

export type CreateReportInput = Optional<Report, 'id' | 'status' | 'createdAt'>

export type UpdateReportInput = Partial<Pick<Report, 'url' | 'status'>>

export abstract class ReportsRepository {
  abstract create(report: CreateReportInput): Promise<Report>
  abstract fetchByUserId(userId: string): Promise<Report[]>
  abstract update(id: string, report: UpdateReportInput): Promise<Report>
}
