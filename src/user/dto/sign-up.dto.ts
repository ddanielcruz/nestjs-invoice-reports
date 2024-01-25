import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @MinLength(6)
  password: string
}
