import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

import { AuthPayload } from './auth.service'

export const User = createParamDecorator(
  (_data: never, context: ExecutionContext): AuthPayload => {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  },
)
