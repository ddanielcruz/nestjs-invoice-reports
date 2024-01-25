import { hash, compare } from 'bcryptjs'

import { HashComparer } from './hash-comparer.interface'
import { HashGenerator } from './hash-generator.interface'

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
