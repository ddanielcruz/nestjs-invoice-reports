import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'

import { configSchema } from './config.schema'
import { ConfigService } from './config.service'

@Module({
  imports: [
    NestConfigModule.forRoot({ validate: (env) => configSchema.parse(env) }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
