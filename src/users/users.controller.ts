/* eslint-disable prettier/prettier */
import { Controller, Body, Post } from '@nestjs/common'
import { UsersService } from './users.service'


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  async register(@Body() body) {
    return this.userService.register(body)
  }
}
