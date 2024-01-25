import { postgresContainer } from '@/test/containers/postgres-container'

import { PrismaUsersRepository } from './prisma-users-repository'
import { PrismaService } from '../prisma.service'

describe('PrismaUsersRepository', () => {
  let sut: PrismaUsersRepository
  let prisma: PrismaService

  beforeAll(async () => {
    await postgresContainer.start()
    prisma = new PrismaService()
    sut = new PrismaUsersRepository(prisma)
  })

  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    const users = await prisma.user.findMany()
    console.log({ users })
    await prisma?.$disconnect()
    await postgresContainer.stop()
  })

  describe('findByEmail', () => {
    it('finds an user by email', async () => {
      //
    })

    it('returns null if no user is found', async () => {
      //
    })
  })

  describe('create', () => {
    it('creates an user', async () => {
      //
    })
  })
})
