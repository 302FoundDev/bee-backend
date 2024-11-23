/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { UrlDto } from 'src/dto/urls.dto'

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async existingSlug(slug: string) {

    try {
      const url = await this.prisma.url.findUnique({
        where: { slug }
      })

      return !!url
    }

    catch (error) {
      throw new Error(`Error checking slug existence: ${error}`)
    }

  }

  async slug(urlDto: UrlDto) {
    
    try {
      const { url, slug, userId } = urlDto

      const urlRecord = await this.prisma.url.create({
        data: {
          url,
          slug,
          userId
        }
      })

      return urlRecord
    }

    catch (error) {
      throw new Error(`Error shortening URL: ${error}`)
    }

  }

  async getSlug() {

    try {
      return await this.prisma.url.findMany()
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }

  }

}
