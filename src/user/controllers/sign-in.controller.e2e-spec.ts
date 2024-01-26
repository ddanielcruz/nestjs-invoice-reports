import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '@/app.module'
import { HashGenerator } from '@/shared/cryptography/hash-generator.interface'
import { PrismaService } from '@/shared/database/prisma/prisma.service'
import { postgresContainer } from '@/test/containers/postgres-container'
import { makeUser } from '@/test/factories/user-factory'

describe('SignUpController', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    await postgresContainer.start()

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    await app.init()

    prisma = app.get(PrismaService)
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await postgresContainer.stop()
  })

  it('returns 401 on invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/users/sign-in')
      .send({ email: 'any@mail.com', password: 'any-password' })
      .expect(401)
  })

  it('returns 200 on success', async () => {
    const hashGenerator = app.get(HashGenerator)
    const user = await prisma.user.create({
      data: makeUser({
        hashedPassword: await hashGenerator.hash('any-password'),
      }),
    })

    const response = await request(app.getHttpServer())
      .post('/users/sign-in')
      .send({ email: user.email, password: 'any-password' })
      .expect(200)

    expect(response.body).toEqual({
      accessToken: expect.any(String),
    })
  })
})
