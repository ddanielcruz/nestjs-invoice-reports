import { Module } from '@nestjs/common'

import { BcryptService } from './services/bcrypt.service'
import { HashComparer } from './services/hash-comparer.service'
import { HashGenerator } from './services/hash-generator.service'

@Module({
  providers: [
    { provide: HashGenerator, useClass: BcryptService },
    { provide: HashComparer, useClass: BcryptService },
  ],
  exports: [HashGenerator, HashComparer],
})
export class CryptographyModule {}
