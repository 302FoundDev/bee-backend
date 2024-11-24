import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers.authorization

    if (!authHeader) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]
    try {
      const payload = this.jwtService.verify(token)
      request.user = payload
      return true
    } catch (error) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
  }
}
