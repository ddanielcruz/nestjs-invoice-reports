import { Module } from '@nestjs/common'

import { BcryptService } from './bcrypt.service'
import { HashComparer } from './hash-comparer.service'
import { HashGenerator } from './hash-generator.service'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptService },
    { provide: HashComparer, useClass: BcryptService },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptographyModule {}
