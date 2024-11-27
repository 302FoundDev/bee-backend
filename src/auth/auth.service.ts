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

  async login(email: string, password: string) {
  
      try {
  
        const validateUser = await this.validateUser(email, password)
  
        if (!validateUser) throw new UnauthorizedException('Invalid credentials')

        console.log("validateUser", validateUser)
        const user = await this.prisma.user.findUnique({
          where: { email }
        })
  
        const payload = { email: user.email, id: user.id }

        const token = this.jwtService.sign(payload)

        return {
          access_token: token
        }
      }
  
      catch (error) {
        throw new Error(`Error logging in: ${error}`)
      }
  
    }
}
