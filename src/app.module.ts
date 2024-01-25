import { Module } from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { EnvModule } from './shared/env/env.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [EnvModule, DatabaseModule, UserModule],
})
export class AppModule {}
