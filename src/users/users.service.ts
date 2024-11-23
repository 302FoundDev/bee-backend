/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import bcrypt from 'bcrypt'
import { validationErrors } from '../utils/validations'

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) {}

  static async existingUser(email: string) {

    try {
      const user = await this.prisma.users.findUnique({
        where: { email }
      })

      return !!user // This line return true if user exists & false if not
    }

    catch (error) {
      throw new Error(`Error checking user existence: ${error}`)
    }

  }

  static async register(name: string, email: string, password: string) {

    try {

      const validate = validationErrors(email, password)

      if (Object.keys(validate).length > 0) {
        return validate
      }

      const existingUser = await this.existingUser(email)

      if (existingUser) {
        throw new Error('User already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const user = await this.prisma.users.create({
        data: {
          full_name: name,
          email,
          password: hashedPassword
        }
      })

      return user
    }

    catch (error) {
      throw new Error(`Error creating user: ${error}`)
    }

  }

}
