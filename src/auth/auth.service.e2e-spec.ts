import { Test } from '@nestjs/testing'

import { SharedModule } from '@/shared/shared.module'

import { AuthModule } from './auth.module'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let sut: AuthService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, SharedModule],
    }).compile()

    sut = moduleRef.get(AuthService)
  })

  describe('signToken', () => {
    it('signs a new token', async () => {
      const payload = { sub: '123' }
      const token = await sut.signToken(payload)
      expect(token).toBeTruthy()
    })
  })

  describe('verifyToken', () => {
    it('returns the token payload if token is valid', async () => {
      const payload = { sub: '123' }
      const token = await sut.signToken(payload)
      const extractedPayload = await sut.verifyToken(token)
      expect(extractedPayload).toMatchObject(payload)
    })

    it('throws if token is invalid', async () => {
      const promise = sut.verifyToken('invalid_token')
      await expect(promise).rejects.toThrow()
    })
  })
})
