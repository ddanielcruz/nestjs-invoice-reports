import { Injectable } from '@nestjs/common'
import { hash, compare } from 'bcryptjs'

import { EnvService } from '@/shared/env/env.service'

import { HashComparer } from './hash-comparer.interface'
import { HashGenerator } from './hash-generator.interface'

@Injectable()
export class BcryptService implements HashGenerator, HashComparer {
  get saltRounds(): number {
    return this.env.get('SALT_ROUNDS')
  }

  constructor(private readonly env: EnvService) {}

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.saltRounds)
  }

  compare(plainText: string, hashedText: string): Promise<boolean> {
    return compare(plainText, hashedText)
  }
}
