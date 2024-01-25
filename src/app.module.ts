import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { ConfigModule } from './shared/config/config.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
})
export class AppModule {}
