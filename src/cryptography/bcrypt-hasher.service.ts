import { hash, compare } from 'bcryptjs'

import { Hasher } from './hasher.service'

export const SALT_ROUNDS = 12

export class BcryptHasher extends Hasher {
  private readonly saltRounds = SALT_ROUNDS

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.saltRounds)
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText)
  }
}
