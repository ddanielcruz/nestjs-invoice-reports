import * as bcrypt from 'bcryptjs'

import { BcryptService, SALT_ROUNDS } from './bcrypt.service'

describe('BcryptService', () => {
  let sut: BcryptService

  beforeEach(() => {
    sut = new BcryptService()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('hash', () => {
    it('should return a hashed string', async () => {
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      const plainText = 'any_plain_text'
      const hashedText = await sut.hash(plainText)

      expect(hashedText).not.toBe(plainText)
      expect(hashSpy).toHaveBeenCalledWith(plainText, SALT_ROUNDS)
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
      const hashedText = await bcrypt.hash(plainText, SALT_ROUNDS)
      const areEqual = await sut.compare(plainText, hashedText)

      expect(areEqual).toBe(true)
    })

    it('should return false if plain text and hashed text are not the same', async () => {
      const plainText = 'any_plain_text'
      const hashedText = await bcrypt.hash('other_plain_text', SALT_ROUNDS)
      const areEqual = await sut.compare(plainText, hashedText)

      expect(areEqual).toBe(false)
    })
  })
})
