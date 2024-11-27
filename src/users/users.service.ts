/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  async existingUser(email): Promise<boolean> {

    try {
      const user = await this.prisma.user.findUnique({
        where: { email }
      })

      return !!user
    }

    catch (error) {
      throw new Error(`Error checking user existence: ${error}`)
    }

  }

  async register(full_name: string, email: string, password: string) {

    try {

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

  async getUserData(id: number) {
    try {
      const user = await this.prisma.user.findMany({
        where: { id },
        include: { urls: true }
      })

      if (!user) {
        console.log('User not found')
        throw new Error('User not found')
      }

      return user[0]
    } catch (error) {
      console.error(`Error getting user: ${error.message}`)
      throw new Error(`Error getting user: ${error.message}`)
    }
  }

  async updateUser(id: number, data: User) {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data
      })

      return user
    } catch (error) {
      console.error(`Error updating user: ${error.message}`)
      throw new Error(`Error updating user: ${error.message}`)
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.prisma.user.delete({
        where: { id }
      })

      return { status: 'success', message: 'User deleted successfully', data: user }
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`)
      throw new Error(`Error deleting user: ${error.message}`)
    }
  }

}
