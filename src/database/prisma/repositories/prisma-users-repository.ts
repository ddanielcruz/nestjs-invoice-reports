import { Injectable } from '@nestjs/common'

import { Optional } from '@/shared/types/optional'
import { User } from '@/user/user.entity'
import { UsersRepository } from '@/user/user.repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaUsersRepository extends UsersRepository {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  create(
    user: Optional<User, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<User> {
    return this.prisma.user.create({ data: user })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } })
  }
}
