/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto, LoginUserDto } from 'src/dto/users.dto'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  async existingUser(email): Promise<boolean> {

    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      })

      return !!user // This line return true if user exists & false if not
    }

    catch (error) {
      throw new Error(`Error checking user existence: ${error}`)
    }

  }

  async checkCredentials(email, password): Promise<boolean> {

    const user = await this.prisma.user.findUnique({
      where: { email }
    })

    if (!user) return false

    const isPasswordValid = await bcrypt.compare(password, user.password)
    return isPasswordValid

  }

  async register(createUserDto: CreateUserDto) {

    try {
      const { full_name, email, password } = createUserDto

      const existingUser = await this.existingUser(email)

      if (existingUser) throw 'User already exists'

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.prisma.user.create({
        data: {
          full_name,
          email,
          password: hashedPassword
        }
      })

      return user
    }

    catch (error) {
      throw (`Error creating user: ${error}`)
    }

  }

  async login(loginUserDto: LoginUserDto) {

    try {
      const secret = process.env.JWT_SECRET_KEY!
      
      const { email, password } = loginUserDto

      const checkCredentials = await this.checkCredentials(email, password)

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

  async getUserData(id: number) {
    try {
      const user = await this.prisma.user.findMany({
        where: { id },
        include: { urls: true }
      })

      if (!user) {
        console.log('Usuario no encontrado')
        throw new Error('User not found')
      }

      return user[0]
    } catch (error) {
      console.error(`Error obteniendo usuario: ${error.message}`)
      throw new Error(`Error getting user: ${error.message}`)
    }
  }

}
