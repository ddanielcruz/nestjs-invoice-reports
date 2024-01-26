import { ReportStatus } from '@/report/report.entity'
import { postgresContainer } from '@/test/containers/postgres-container'
import { makeReport } from '@/test/factories/report-factory'
import { makeUser } from '@/test/factories/user-factory'

import { PrismaReportsRepository } from './prisma-reports-repository'
import { PrismaService } from '../prisma.service'

describe('PrismaReportsRepository', () => {
  let sut: PrismaReportsRepository
  let prisma: PrismaService

  beforeAll(async () => {
    await postgresContainer.start()
    prisma = new PrismaService()
    sut = new PrismaReportsRepository(prisma)
  })

  beforeEach(async () => {
    await prisma.report.deleteMany()
  })

  afterAll(async () => {
    await prisma?.$disconnect()
    await postgresContainer.stop()
  })

  describe('create', () => {
    it('creates a new report', async () => {
      const user = await prisma.user.create({ data: makeUser() })
      const report = await sut.create({
        userId: user.id,
        url: 'https://example.com',
      })

      expect(report.id).toBeTruthy()
      expect(report.userId).toEqual(user.id)
      expect(report.url).toEqual('https://example.com')
      expect(report.status).toEqual('pending')
    })

    it('creates a new report with optional fields populated', async () => {
      const user = await prisma.user.create({ data: makeUser() })
      const createdAt = new Date()
      const report = await sut.create({
        userId: user.id,
        url: 'https://example.com',
        status: ReportStatus.completed,
        createdAt,
      })

      expect(report.id).toBeTruthy()
      expect(report.userId).toEqual(user.id)
      expect(report.url).toEqual('https://example.com')
      expect(report.status).toEqual(ReportStatus.completed)
      expect(report.createdAt.toISOString()).toEqual(createdAt.toISOString())
    })
  })

  describe('fetchByUserId', () => {
    it('fetches all reports from user', async () => {
      const userA = await prisma.user.create({ data: makeUser() })
      const userB = await prisma.user.create({ data: makeUser() })
      await prisma.report.createMany({
        data: [
          makeReport({ userId: userA.id }),
          makeReport({ userId: userA.id }),
          makeReport({ userId: userB.id }),
        ],
      })

      const reports = await sut.fetchByUserId(userA.id)

      expect(reports).toHaveLength(2)
      expect(reports[0].userId).toEqual(userA.id)
      expect(reports[1].userId).toEqual(userA.id)
    })
  })
})
