import { BadRequestException, Body, Controller, Post } from '@nestjs/common'

import { Public } from '@/auth/public.decorator'

import { SignUpDto } from '../dtos/sign-up.dto'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { SignUpService } from '../services/sign-up.service'

@Controller('/users/sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  @Public()
  async handle(@Body() body: SignUpDto) {
    try {
      const { user } = await this.signUpService.execute(body)

      return {
        ...user,
        hashedPassword: undefined,
      }
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException(error.message)
      }

      throw error
    }
  }
}
