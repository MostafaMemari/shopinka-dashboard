import { categoryFormSchema } from '@/libs/validators/category.schema'
import { Seo } from './seo.type'
import * as yup from 'yup'
import { GalleryItem } from './galleryItem.type'

export type Category = {
  id: number
  name: string
  slug: string
  description: string | null
  parentId: number | null
  userId: number
  thumbnailImageId: number | null
  createdAt: string
  updatedAt: string
  thumbnailImage: GalleryItem
  type: CategoryType
  children: Category[] | []
  parent: Category | null
  seoMeta: Seo | null
}

export enum CategoryType {
  PRODUCT = 'PRODUCT',
  BLOG = 'BLOG'
}

export type CategoryFormType = yup.InferType<typeof categoryFormSchema>
