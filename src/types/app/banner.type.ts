import * as yup from 'yup'
import { bannerSchema } from '@/libs/validators/banner.schema'
import { GalleryItem } from './galleryItem.type'

export type Banner = {
  id: number
  link: string
  isActive: boolean
  type: BannerType
  image: GalleryItem
  imageId: number
}

export type BannerFormType = yup.InferType<typeof bannerSchema>

export enum BannerType {
  MAIN_SLIDER = 'MAIN_SLIDER',
  SIDE = 'SIDE'
}
