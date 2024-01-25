import { Optional } from '@/shared/types/optional'

import { User } from './user.entity'

export type CreateUserInput = Optional<User, 'id' | 'createdAt' | 'updatedAt'>

export abstract class UsersRepository {
  abstract create(user: CreateUserInput): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
}
