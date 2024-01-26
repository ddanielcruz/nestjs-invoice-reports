import { Global, Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { CryptographyModule } from './cryptography/cryptography.module'
import { DatabaseModule } from './database/database.module'

@Global()
@Module({
  imports: [ConfigModule, CryptographyModule, DatabaseModule],
  exports: [ConfigModule, CryptographyModule, DatabaseModule],
})
export class SharedModule {}
