import { Module } from '@nestjs/common'

import { SignUpService } from './services/sign-up.service'
import { UserController } from './user.controller'

@Module({
  controllers: [UserController],
  providers: [SignUpService],
})
export class UserModule {}
