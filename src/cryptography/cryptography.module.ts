import { Module } from '@nestjs/common'

import { BcryptHasher } from './bcrypt-hasher.service'
import { Hasher } from './hasher.service'

@Module({
  providers: [{ provide: Hasher, useClass: BcryptHasher }],
  exports: [Hasher],
})
export class CryptographyModule {}
