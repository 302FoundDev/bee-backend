import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/users.dto';

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
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const login = await this.authService.login(loginUserDto)

      return { status: 'success', message: 'User logged in successfully', data: login }
    }
    catch (error) {
      throw new HttpException({ status: 'error', message: error.message }, HttpStatus.UNAUTHORIZED)
    }
  }

}
