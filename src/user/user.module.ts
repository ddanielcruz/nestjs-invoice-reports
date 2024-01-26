import { Module } from '@nestjs/common'

import { AuthModule } from '@/auth/auth.module'

import { SignInController } from './controllers/sign-in.controller'
import { SignUpController } from './controllers/sign-up.controller'
import { SignInService } from './services/sign-in.service'
import { SignUpService } from './services/sign-up.service'

@Module({
  imports: [AuthModule],
  controllers: [SignUpController, SignInController],
  providers: [SignUpService, SignInService],
})
export class UserModule {}
