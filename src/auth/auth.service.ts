import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface AuthPayload {
  sub: string
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  signToken(payload: AuthPayload): Promise<string> {
    return this.jwtService.signAsync(payload)
  }

  async verifyToken(token: string): Promise<AuthPayload> {
    return await this.jwtService.verifyAsync<AuthPayload>(token)
  }
}
