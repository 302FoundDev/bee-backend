import { Injectable } from '@nestjs/common'
import { LoginDto } from 'src/dto/login.dto'

@Injectable()
export class AuthService {

  async validateUser(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      return { username: 'admin' };
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    return {
      access_token: 'token',
    }
  }
}
