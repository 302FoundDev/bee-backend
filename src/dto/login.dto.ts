import {  IsString, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
