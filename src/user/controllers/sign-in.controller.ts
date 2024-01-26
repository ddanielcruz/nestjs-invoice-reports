import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common'

import { Public } from '@/auth/public.decorator'

import { SignInDto } from '../dtos/sign-in.dto'
import { InvalidCredentialsError } from '../errors/invalid-credentials.error'
import { SignInService } from '../services/sign-in.service'

@Controller('/users/sign-in')
export class SignInController {
  constructor(private readonly signInService: SignInService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() body: SignInDto) {
    try {
      return await this.signInService.execute(body)
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message)
      }

      throw error
    }
  }
}
