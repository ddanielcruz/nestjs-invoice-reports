import { hash, compare } from 'bcryptjs'

import { HasherService } from './hasher.service'

export const SALT_ROUNDS = 12

export class BcryptHasherService extends HasherService {
  private readonly saltRounds = SALT_ROUNDS

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.saltRounds)
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText)
  }
}
