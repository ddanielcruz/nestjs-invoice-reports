import { Injectable } from '@nestjs/common'

import { HashGenerator } from '@/cryptography/hash-generator.service'

import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { User } from '../user.entity'
import { UsersRepository } from '../user.repository'

export type SignUpRequest = {
  name: string
  email: string
  password: string
}

export type SignUpResponse = {
  user: User
}

@Injectable()
export class SignUpService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: SignUpRequest): Promise<SignUpResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(email)
    }

    const hashedPassword = await this.hashGenerator.hash(password)
    const user = await this.usersRepository.create({
      name,
      email,
      hashedPassword,
    })

    return { user }
  }
}
