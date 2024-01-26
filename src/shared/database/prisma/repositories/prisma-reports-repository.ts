import { Injectable } from '@nestjs/common'

import { Report, ReportStatus } from '@/report/report.entity'
import { ReportsRepository } from '@/report/report.repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaReportsRepository extends ReportsRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  async fetchByUserId(userId: string): Promise<Report[]> {
    const reports = await this.prisma.report.findMany({ where: { userId } })
    return reports.map((report) => ({
      ...report,
      status: report.status as ReportStatus,
    }))
  }
}
