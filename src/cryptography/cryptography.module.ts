import { Module } from '@nestjs/common'

import { BcryptHasherService } from './bcrypt-hasher.service'
import { HasherService } from './hasher.service'

@Module({
  providers: [{ provide: HasherService, useClass: BcryptHasherService }],
  exports: [HasherService],
})
export class CryptographyModule {}
