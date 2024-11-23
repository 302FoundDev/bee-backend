/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Get, HttpException, HttpStatus } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto, LoginUserDto, GetUserDataDto } from 'src/dto/users.dto'


@Controller('users')
@ApiTags('👨‍💻 Users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const register = await this.userService.register(createUserDto)

      return { status: 'success', message: 'User registered successfully', data: register }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('login')
  @ApiOperation({ summary: 'Login as an existing user' })
  @ApiBody({ type: LoginUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const login = await this.userService.login(loginUserDto)

      return { status: 'success', message: 'User logged in successfully', data: login }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('get-user-data')
  @ApiOperation({ summary: 'Get user data' })
  @ApiBody({ type: GetUserDataDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async getUserData(@Body() getUserData: GetUserDataDto) {
    try {
      const userData = await this.userService.getUserData(getUserData)

      return { status: 'success', message: 'User data retrieved successfully', data: userData }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

}
