import { Body, Controller, HttpException, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login.dto';

@Controller('auth')
@ApiTags('🔐 auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login as an existing user' })
  @ApiBody({ type: LoginUserDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to login.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User login successfully.' })
  async login(@Body() loginUserDto: LoginUserDto, @Res() response) {
    try {
      const login = await this.authService.login(loginUserDto)

      response.cookie('access_token', login.access_token, { 
        httpOnly: true, 
        maxAge: 86400000,
        secure: process.env.NODE_ENV === 'development' ? false : true, 
        sameSite: 'Strict',
      })

      return { status: 'success', message: 'User logged in successfully', data: login }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout as an existing user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to logout.' })
  @ApiResponse({ status: 200, description: 'User logout successfully.' })
  async logout(@Res() response) {
    try {
      response.clearCookie('access_token')
      return { status: 'success', message: 'User logged out successfully' }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

}
