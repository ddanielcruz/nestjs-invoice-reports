import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '@/app.module'
import { AuthService } from '@/auth/auth.service'
import { HashGenerator } from '@/shared/cryptography/hash-generator.interface'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { postgresContainer } from '@/test/containers/postgres-container'
import { makeReport } from '@/test/factories/report-factory'
import { makeUser } from '@/test/factories/user-factory'
import { User } from '@/user/user.entity'

describe('FetchReportsController', () => {
  let app: INestApplication
  let prisma: PrismaService
  let user: User
  let accessToken: string

  beforeAll(async () => {
    await postgresContainer.start()

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    prisma = app.get(PrismaService)
    user = await prisma.user.create({ data: makeUser() })
    accessToken = await app.get(AuthService).signToken({ sub: user.id })
  })

  beforeEach(async () => {
    await prisma.report.deleteMany()
  })

  afterAll(async () => {
    await postgresContainer.stop()
  })

  it('returns 401 if no access token is provided', async () => {
    await request(app.getHttpServer()).get('/reports').expect(401)
  })

  it('returns 401 if access token is invalid', async () => {
    await request(app.getHttpServer())
      .get('/reports')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401)
  })

  it('returns 200 with all user reports on success', async () => {
    await prisma.report.createMany({
      data: [makeReport({ userId: user.id }), makeReport({ userId: user.id })],
    })

    const response = await request(app.getHttpServer())
      .get('/reports')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200)

    expect(response.body.reports).toHaveLength(2)
  })
})
