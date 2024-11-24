/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { UrlsController } from './urls.controller'
import { UrlsService } from './urls.service'
import { PrismaService } from 'src/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, PrismaService, JwtService],
  exports: [UrlsService]
})
export class UrlsModule {}
