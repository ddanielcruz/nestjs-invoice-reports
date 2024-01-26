import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod'

import { AuthModule } from './auth/auth.module'
import { LoggerMiddleware } from './core/middleware/logger.middleware'
import { SharedModule } from './shared/shared.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [AuthModule, SharedModule, UserModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
