import { Injectable } from '@nestjs/common'

import { AuthService } from '@/auth/auth.service'
import { HashComparer } from '@/shared/cryptography/hash-comparer.interface'

import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import { UsersRepository } from '../user.repository'

type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = {
  accessToken: string
}

@Injectable()
export class SignInService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashComparer: HashComparer,
    private readonly authService: AuthService,
  ) {}

  async execute(request: SignInRequest): Promise<SignInResponse> {
    const user = await this.usersRepository.findByEmail(request.email)

    if (user) {
      const isSamePassword = await this.hashComparer.compare(
        request.password,
        user.hashedPassword,
      )

      if (isSamePassword) {
        const accessToken = await this.authService.signToken({ sub: user.id })
        return { accessToken }
      }
    }

    throw new InvalidCredentialsError()
  }
}
