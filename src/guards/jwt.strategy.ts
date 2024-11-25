import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'
import { User } from '@prisma/client'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    })
  }

  async validate(payload: { email: string; id: number }): Promise<User> {
    const user = await this.usersService.findUserById(payload.id)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
