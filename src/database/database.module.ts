import { Global, Module } from '@nestjs/common'

import { UsersRepository } from '@/user/user.repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
