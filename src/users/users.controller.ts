/* eslint-disable prettier/prettier */
import { Controller, Body, Post, Get, HttpException, HttpStatus, Request, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/dto/users.dto'


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
      console.log(error, error.message)
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Get('get-user-data')
  @ApiOperation({ summary: 'Get user data' })
  @ApiQuery({ name: 'id', type: Number })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async getUserData(@Request() req: any, @Param('id') id: number) {
    try {
      // This line is commented out because we tested the endpoint with Swagger UI
      // Uncomment this line when testing with Swagger UI is complete

      //const { id } = req.user.id

      const userData = await this.userService.getUserData(id)

      return { status: 'success', message: 'User data retrieved successfully', data: userData }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }



}

