import { Module } from '@nestjs/common'

import { ReportsRepository } from '@/report/report.repository'
import { UsersRepository } from '@/user/user.repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaReportsRepository } from './prisma/repositories/prisma-reports-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    { provide: UsersRepository, useClass: PrismaUsersRepository },
    { provide: ReportsRepository, useClass: PrismaReportsRepository },
  ],
  exports: [UsersRepository, ReportsRepository],
})
export class DatabaseModule {}
