import { Optional } from '@/types/optional'

import { User } from './user.entity'

export abstract class UsersRepository {
  abstract create(user: Optional<User, 'id' | 'createdAt'>): Promise<User>
  abstract findByEmail(email: string): Promise<User | null>
}
