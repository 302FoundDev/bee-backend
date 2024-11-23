/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body } from '@nestjs/common'
import { UrlsService } from './urls.service'
import { UrlDto } from 'src/dto/urls.dto'
import { ApiOperation } from '@nestjs/swagger'

@Controller('urls')
export class UrlsController {

  constructor(private readonly urlsService: UrlsService) {}

  @Post('slug')
  @ApiOperation({ summary: 'Shorten URL' })
  async slug(@Body() urlDto: UrlDto) {
    try {
      const slug = await this.urlsService.slug(urlDto)

      return { status: 'success', message: 'url shortened successfully', data: slug }
    }

    catch (error) {
      throw new Error(`Error shortening URL: ${error}`)
    }
  }

  @Get('get-slug')
  @ApiOperation({ summary: 'Get all slugs' })
  async getSlug() {
    try {
      const getSlug = await this.urlsService.getSlug()

      return { status: 'success', message: 'all slugs retrieved successfull', data: getSlug }
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }
  }

}
