import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common'

import { AuthPayload } from './auth.service'

export type UserData = {
  id: string
}

export const User = createParamDecorator(
  (_data: never, context: ExecutionContext): UserData => {
    const request = context.switchToHttp().getRequest()
    const userPayload = request.user as AuthPayload

    if (!userPayload) {
      throw new UnauthorizedException()
    }

    return {
      id: userPayload.sub,
    }
  },
)
