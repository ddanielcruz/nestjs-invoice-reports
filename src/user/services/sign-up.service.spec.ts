import { HashGenerator } from '@/cryptography/services/hash-generator.service'
import { makeUser } from '@/test/factories/user.factory'
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository'

import { SignUpRequest, SignUpService } from './sign-up.service'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

class HasherServiceStub implements HashGenerator {
  async hash(plainText: string): Promise<string> {
    return `hashed_${plainText}`
  }
}

describe('SignUpService', () => {
  let sut: SignUpService
  let hashGenerator: HashGenerator
  let inMemoryUsersRepository: InMemoryUsersRepository

  const validRequest: SignUpRequest = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: '123456',
  }

  beforeEach(() => {
    hashGenerator = new HasherServiceStub()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new SignUpService(inMemoryUsersRepository, hashGenerator)
  })

  it('verifies user with same email does not exist', async () => {
    const findByEmailSpy = jest.spyOn(inMemoryUsersRepository, 'findByEmail')
    await sut.execute(validRequest)
    expect(findByEmailSpy).toHaveBeenCalledWith(validRequest.email)
  })

  it('throws if user with same email already exists', async () => {
    await inMemoryUsersRepository.create(
      makeUser({ email: validRequest.email }),
    )
    await expect(sut.execute(validRequest)).rejects.toThrow(
      UserAlreadyExistsError,
    )
  })

  it('hashes user password', async () => {
    const hashSpy = jest.spyOn(hashGenerator, 'hash')
    await sut.execute(validRequest)
    expect(hashSpy).toHaveBeenCalledWith(validRequest.password)
  })

  it('creates a new user', async () => {
    const createSpy = jest.spyOn(inMemoryUsersRepository, 'create')
    const result = await sut.execute(validRequest)
    expect(createSpy).toHaveBeenCalledWith({
      name: validRequest.name,
      email: validRequest.email,
      hashedPassword: `hashed_${validRequest.password}`,
    })
    expect(result.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: validRequest.name,
        email: validRequest.email,
        hashedPassword: `hashed_${validRequest.password}`,
        createdAt: expect.any(Date),
      }),
    )
    expect(inMemoryUsersRepository.items).toMatchObject([result.user])
  })
})
