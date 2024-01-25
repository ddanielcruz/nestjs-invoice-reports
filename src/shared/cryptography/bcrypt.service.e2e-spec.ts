import { Test } from '@nestjs/testing'
import * as bcrypt from 'bcryptjs'

import { EnvModule } from '@/env/env.module'

import { BcryptService } from './bcrypt.service'

describe('BcryptService', () => {
  let sut: BcryptService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EnvModule],
      providers: [BcryptService],
    }).compile()

    sut = moduleRef.get(BcryptService)
  })

  describe('hash', () => {
    it('should return a hashed string', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      const plainText = 'any_plain_text'
      const hashedText = await sut.hash(plainText)

      expect(hashedText).not.toBe(plainText)
      expect(hashSpy).toHaveBeenCalledWith(plainText, expect.any(Number))
    })

    it('should return a different hashed string for the same plain text', async () => {
      const plainText = 'any_plain_text'
      const hashedText1 = await sut.hash(plainText)
      const hashedText2 = await sut.hash(plainText)

      expect(hashedText1).not.toBe(hashedText2)
    })
  })

  describe('compare', () => {
    it('should return true if plain text and hashed text are the same', async () => {
      const plainText = 'any_plain_text'
      const hashedText = await bcrypt.hash(plainText, sut.saltRounds)
      const areEqual = await sut.compare(plainText, hashedText)

      expect(areEqual).toBe(true)
    })

    it('should return false if plain text and hashed text are not the same', async () => {
      const plainText = 'any_plain_text'
      const hashedText = await bcrypt.hash('other_plain_text', sut.saltRounds)
      const areEqual = await sut.compare(plainText, hashedText)

      expect(areEqual).toBe(false)
    })
  })
})
