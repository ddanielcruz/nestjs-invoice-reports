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
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma?.$disconnect()
    await postgresContainer.stop()
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
