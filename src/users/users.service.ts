/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaService } from 'src/prisma.service'
import { CreateUserDto, ExistingUsersDto, LoginUserDto } from 'src/dto/users.dto'

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  async existingUser(email) {
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

  async checkCredentials(req: LoginUserDto) {

    const user = await this.prisma.user.findUnique({
      where: { email: req.email }
    })

    if (!user) return false

    const isPasswordValid = await bcrypt.compare(req.password, user.password)
    return isPasswordValid

  }

  async register(req: CreateUserDto) {

    try {

      const existingUser = await this.existingUser({ email: req.email })

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(req.password, 10)

      const user = await this.prisma.user.create({
        data: {
          full_name: req.full_name,
          email: req.email,
          password: hashedPassword
        }
      })

      return user
    }

    catch (error) {
      throw new Error(`Error creating user: ${error}`)
    }

  }

  async login(req: LoginUserDto) {

    try {
      const user = await this.prisma.user.findUnique({
        where: { email: req.email }
      })

      if (!user) {
        throw new Error('User not found')
      }

      const passwordMatch = await bcrypt.compare(req.password, user.password)

      if (!passwordMatch) {
        throw new Error('Invalid password')
      }

      return user
    }

    catch (error) {
      throw new Error(`Error logging in: ${error}`)
    }

  }

}
