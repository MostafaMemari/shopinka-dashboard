import * as yup from 'yup'
import { tagFormSchema } from '@/libs/validators/tag.schema'
import { Seo } from './seo.type'
import { Category } from './category.type'
import { GalleryItem } from './gallery.type'

export type Tag = {
  id: number
  name: string
  slug: string | null
  description: string | null
  userId: number
  thumbnailImageId: number | null
  createdAt: string
  updatedAt: string
  thumbnailImage: GalleryItem
  seoMeta?: Seo | null

  categoryIds: number[] | []
  tagIds: number[] | []
  categories: Category[] | undefined
  tags: Tag[] | undefined

  type: TagType
}

export type TagFormType = yup.InferType<typeof tagFormSchema>

export enum TagType {
  PRODUCT = 'PRODUCT',
  BLOG = 'BLOG'
}
