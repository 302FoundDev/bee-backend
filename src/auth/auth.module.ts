/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { PrismaService } from 'src/prisma.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { SECRET_KEY } from 'src/env.config'

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService],
})

export class AuthModule { }
