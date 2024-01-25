import { faker } from '@faker-js/faker'

import { User } from '@/user/user.entity'

export function makeUser(override?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    hashedPassword: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  }
}
