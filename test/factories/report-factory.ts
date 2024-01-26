import { faker } from '@faker-js/faker'

import { Report, ReportStatus } from '@/report/report.entity'

export function makeReport(override?: Partial<Report>): Report {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    url: faker.internet.url(),
    status: ReportStatus.pending,
    createdAt: new Date(),
    ...override,
  }
}
