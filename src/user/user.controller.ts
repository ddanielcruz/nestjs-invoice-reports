import { BadRequestException, Body, Controller, Post } from '@nestjs/common'

import { SignUpDto } from './dto/sign-up.dto'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { SignUpService } from './services/sign-up.service'

// TODO Add integration tests
@Controller('users')
export class UserController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    try {
      const { user } = await this.signUpService.execute(dto)

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
