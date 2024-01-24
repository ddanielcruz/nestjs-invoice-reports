import { hash, compare } from 'bcryptjs'

import { HashComparer } from './hash-comparer.service'
import { HashGenerator } from './hash-generator.service'

export const SALT_ROUNDS = 12

export class BcryptService implements HashGenerator, HashComparer {
  private readonly saltRounds = SALT_ROUNDS

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.saltRounds)
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText)
  }
}
