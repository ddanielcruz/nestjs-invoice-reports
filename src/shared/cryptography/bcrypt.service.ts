import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'

import { ConfigService } from '@/shared/config/config.service'

import { HashComparer } from './hash-comparer.interface'
import { HashGenerator } from './hash-generator.interface'

@Injectable()
export class BcryptService implements HashGenerator, HashComparer {
  get saltRounds(): number {
    return this.config.get('SALT_ROUNDS')
  }

  constructor(private readonly config: ConfigService) {}

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.saltRounds)
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText)
  }
}
