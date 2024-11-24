/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { PrismaService } from 'src/prisma.service'
import { UrlDto } from 'src/dto/urls.dto'

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async existingSlug(slug: string, ownerId: number): Promise<boolean> {

    try {
      const url = await this.prisma.url.findFirst({
        where: { 
          slug,
          userId: ownerId
         }
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
      const existingSlug = await this.existingSlug(slug, userId)

      if (existingSlug) {
        throw new Error('Slug already exists')
      }

      const urlPattern = /^https?:\/\//
      let completeUrl = url.trim()

      if (!urlPattern.test(completeUrl)) {
        completeUrl = `http://${completeUrl}`
      }

      const shortenedSlug = uuidv4().slice(0, 7)

      const urlRecord = await this.prisma.url.create({
        data: {
          url: completeUrl,
          slug: shortenedSlug,
          userId
        }
      })

      return urlRecord
    }

    catch (error) {
      throw new Error(`Error shortening URL: ${error}`)
    }

  }

  async redirectSlug(nSlug: string) {

    try {
      const urlRecord = await this.prisma.url.findFirst({
        where: { slug: nSlug }
      })

      if (!urlRecord) {
        throw new Error('Slug does not exist')
      }

      return urlRecord.url
    }

    catch (error) {
      throw new Error(`Error fetching URLs: ${error}`)
    }

  }

}
