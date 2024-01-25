import { randomUUID } from 'node:crypto'

import { Optional } from '@/types/optional'
import { User } from '@/user/user.entity'
import { UsersRepository } from '@/user/user.repository'

export class InMemoryUsersRepository extends UsersRepository {
  items: User[] = []

  async create(user: Optional<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      createdAt: new Date(),
      ...user,
    }

    this.items.push(newUser)

    return newUser
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.items.find((user) => user.email === email) ?? null
  }
}
