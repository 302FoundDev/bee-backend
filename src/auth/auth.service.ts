import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from 'src/dto/login.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class AuthService {

  constructor(private readonly prisma: PrismaService) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    })

    if (!user) return false

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) return false

    return true
  }

  async login(loginUserDto: LoginUserDto) {
  
      try {
        const secret = process.env.JWT_SECRET_KEY!
        
        const { email, password } = loginUserDto
  
        const checkCredentials = await this.validateUser(email, password)
  
        if (!checkCredentials) throw ('Invalid credentials')
  
        const user = await this.prisma.user.findUnique({
          where: { email }
        })
  
        const passwordMatch = await bcrypt.compare(password, user.password)
  
        if (!passwordMatch) throw ('Invalid password')
  
        return user
      }
  
      catch (error) {
        throw new Error(`Error logging in: ${error}`)
      }
  
    }
}
