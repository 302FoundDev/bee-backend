import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from 'src/dto/login.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const passwordMatch = await bcrypt.compare(password, user.password)
    return passwordMatch ? user : null
  }

  async login(loginUserDto: LoginUserDto) {
  
      try {
        const { email, password } = loginUserDto
  
        const user = await this.validateUser(email, password)
  
        if (!user) throw new UnauthorizedException('Invalid credentials')
  
        const payload = { email: user.email, id: user.id }
        const access_token = this.jwtService.sign(payload)

        return {
          access_token: access_token
        }
      }
  
      catch (error) {
        throw new Error(`Error logging in: ${error}`)
      }
  
    }
}
