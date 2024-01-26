import { postgresContainer } from '@/test/containers/postgres-container'
import { makeUser } from '@/test/factories/user-factory'

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
    await prisma?.$disconnect()
    await postgresContainer.stop()
  })

  describe('findByEmail', () => {
    it('finds an user by email', async () => {
      const createdUser = await prisma.user.create({ data: makeUser() })
      const user = await sut.findByEmail(createdUser.email)
      expect(user).toEqual(createdUser)
    })

    it('returns null if no user is found', async () => {
      const user = await sut.findByEmail('daniel@example.com')
      expect(user).toBeNull()
    })
  })

  describe('create', () => {
    it('creates an user', async () => {
      const user = await sut.create(makeUser())
      const usersCount = await prisma.user.count()
      expect(user).toBeTruthy()
      expect(usersCount).toEqual(1)
    })
  })
})
