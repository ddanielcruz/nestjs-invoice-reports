import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '@/app.module'
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

  it('returns 400 if email is already used', async () => {
    const user = await prisma.user.create({ data: makeUser() })
    await request(app.getHttpServer())
      .post('/users/sign-up')
      .send({ name: 'John Doe', email: user.email, password: '123456' })
      .expect(400)
  })

  it.each([{ name: null }, { email: 'invalid-email' }, { password: '12345' }])(
    'returns 400 if payload is invalid: %o',
    async (override: object) => {
      await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: '123456',
          ...override,
        })
        .expect(400)
    },
  )

  it('returns 201 on sign up success', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/sign-up')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456',
      })
      .expect(201)

    const userCount = await prisma.user.count()

    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john.doe@example.com',
    })
    expect(response.body.password).toBeFalsy()
    expect(response.body.hashedPassword).toBeFalsy()
    expect(userCount).toBe(1)
  })
})
