import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'

import { DatabaseModule } from './database/database.module'
import { ConfigModule } from './shared/config/config.module'
import { LoggerMiddleware } from './shared/middleware/logger.middleware'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
