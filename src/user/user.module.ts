import { Module } from '@nestjs/common'

import { CryptographyModule } from '@/cryptography/cryptography.module'

import { SignUpService } from './services/sign-up.service'
import { UserController } from './user.controller'

@Module({
  imports: [CryptographyModule],
  controllers: [UserController],
  providers: [SignUpService],
})
export class UserModule {}
