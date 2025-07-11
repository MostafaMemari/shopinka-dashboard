import * as yup from 'yup'
import { GalleryItem } from './gallery.type'
import { bannerSchema } from '@/libs/validators/banner.schema'

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
