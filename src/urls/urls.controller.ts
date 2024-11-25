/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Body, Param, Res, UseGuards, Req, Put, Delete } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UrlsService } from './urls.service'
import { UrlDto } from 'src/dto/urls.dto'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('urls')
@ApiTags('🔗 URLs')
export class UrlsController {

  constructor(private readonly urlsService: UrlsService) {}

  @Post('create-slug')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Shorten URL' })
  @ApiBody({ type: UrlDto })
  @ApiBearerAuth()
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. SLUG not found.' })
  @ApiResponse({ status: 200, description: 'URL shortened successfully.' })
  async slug(@Body() urlDto: UrlDto, @Req() req) {
    try {
      const userId = req.user.id

      const slug = await this.urlsService.slug(urlDto, userId)

      return { status: 'success', message: 'url shortened successfully', data: slug }
    }

    catch (error) {
      throw new Error(`Error shortening URL: ${error}`)
    }
  }

  @Delete('delete-slug/:slug')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete selected slug' })
  @ApiQuery({ name: 'slug', type: String })
  @ApiResponse({ status: 400, description: 'Bad request. Please check your information.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. User not authorized to access user data.' })
  @ApiResponse({ status: 404, description: 'Not found. SLUG not found.' })
  @ApiResponse({ status: 200, description: 'URL deleted successfully.' })
  async deleteSlug(@Param('slug') slug: string, @Req() req) {
    try {
      const userId = req.user.id

      await this.urlsService.deleteSlug(slug, userId)

      return { status: 'success', message: 'url deleted successfully' }
    }

    catch (error) {
      throw new Error(`Error deleting URL: ${error}`)
    }
  }

  @Get('get-slugs')
  @ApiOperation({ summary: 'Get selected slugs' })
  @ApiQuery({ name: 'slug', type: String })
  @ApiBearerAuth()
  @ApiResponse({ status: 302, description: 'Redirect to the original URL.' })
  @ApiResponse({ status: 404, description: 'Not found. The slug does not exist.' })
  async redirectSlug(slug: string, @Res() res) {
    try {
      const getUrl = await this.urlsService.redirectSlug(slug)

      return res.status(302).redirect(getUrl)
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }
  }

}
