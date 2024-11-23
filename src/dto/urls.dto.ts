import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'

export class UrlDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string

  @IsString()
  @IsOptional()
  readonly slug: string

  @IsNumber()
  @IsOptional()
  readonly userId: number
}

export class UrlUpdateDto {
  @IsString()
  @IsNotEmpty()
  readonly url: string

  @IsString()
  @IsOptional()
  readonly slug: string
}
