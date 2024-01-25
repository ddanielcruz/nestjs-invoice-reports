import { randomUUID } from 'node:crypto'

import { User } from '@/user/user.entity'
import { CreateUserInput, UsersRepository } from '@/user/user.repository'

export class InMemoryUsersRepository extends UsersRepository {
  items: User[] = []

  async create(user: CreateUserInput): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...user,
    }

    this.items.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null
  }
}
