import {  IsString, IsEmail, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  full_name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  full_name: string

  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string
}

export class ExistingUsersDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}

export class GetUserDataDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  full_name: string

  @IsNumber()
  @IsNotEmpty()
  created_at: number
}
