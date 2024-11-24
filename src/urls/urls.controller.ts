/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Query } from '@nestjs/common'
import { UrlsService } from './urls.service'
import { UrlDto } from 'src/dto/urls.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('urls')
@ApiTags('🔗 URLs')
export class UrlsController {

  constructor(private readonly urlsService: UrlsService) {}

  @Post('slug')
  @ApiOperation({ summary: 'Shorten URL' })
  @ApiBody({ type: UrlDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
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
  @ApiOperation({ summary: 'Get selected slugs' })
  @ApiQuery({ name: 'slug', type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. User not found.' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully. Response contains user data.' })
  async getSlug(@Query('slug') slug: string) {
    try {
      const getSlug = await this.urlsService.redirectSlug(slug)

      return { status: 'success', message: 'all slugs retrieved successfull', data: getSlug }
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }
  }

}
