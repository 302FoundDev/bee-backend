import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    if (!email) {
      throw new BadRequestException('Email must be provided');
    }

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const passwordMatch = await bcrypt.compare(password, user.password)
    return passwordMatch ? user : null
  }

  async login(email, password) {
  
      try {
  
        const user = await this.validateUser(email, password)
  
        if (!user) throw new UnauthorizedException('Invalid credentials')
  
        const payload = { email: user.email, id: user.id }

        return {
          access_token: this.jwtService.sign(payload)
        }
      }
  
      catch (error) {
        throw new Error(`Error logging in: ${error}`)
      }
  
    }
}
