import { JwtService } from '@nestjs/jwt'

import { AuthService } from '@/auth/auth.service'
import { HashComparer } from '@/shared/cryptography/hash-comparer.interface'
import { makeUser } from '@/test/factories/user-factory'
import { InMemoryUsersRepository } from '@/test/repositories/in-memory-users-repository'

import { SignInService } from './sign-in.service'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'

class HashComparerStub implements HashComparer {
  async compare(): Promise<boolean> {
    return true
  }
}

class AuthServiceStub extends AuthService {
  constructor() {
    super({} as JwtService)
  }

  async signToken() {
    return 'any-token'
  }
}

describe('SignInService', () => {
  let sut: SignInService
  let inMemoryUsersRepo: InMemoryUsersRepository
  let hashComparerStub: HashComparerStub
  let authServiceStub: AuthServiceStub

  beforeEach(() => {
    inMemoryUsersRepo = new InMemoryUsersRepository()
    hashComparerStub = new HashComparerStub()
    authServiceStub = new AuthServiceStub()

    sut = new SignInService(
      inMemoryUsersRepo,
      hashComparerStub,
      authServiceStub,
    )
  })

  it('throws if user is not found by email', async () => {
    const findByEmailSpy = jest.spyOn(inMemoryUsersRepo, 'findByEmail')
    const promise = sut.execute({
      email: 'any-email',
      password: 'any-password',
    })

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
    expect(findByEmailSpy).toHaveBeenCalledWith('any-email')
  })

  it('throws if passwords do not match', async () => {
    const user = await inMemoryUsersRepo.create(makeUser())
    const compareSpy = jest
      .spyOn(hashComparerStub, 'compare')
      .mockResolvedValueOnce(false)

    const promise = sut.execute({
      email: user.email,
      password: 'any-password',
    })

    await expect(promise).rejects.toThrow(InvalidCredentialsError)
    expect(compareSpy).toHaveBeenCalledWith('any-password', user.hashedPassword)
  })

  it('generates an access token on success', async () => {
    const user = await inMemoryUsersRepo.create(makeUser())
    const signTokenSpy = jest.spyOn(authServiceStub, 'signToken')

    const response = await sut.execute({
      email: user.email,
      password: 'any-password',
    })

    expect(response).toEqual({ accessToken: 'any-token' })
    expect(signTokenSpy).toHaveBeenCalledWith({ sub: user.id })
  })
})
