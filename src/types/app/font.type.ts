import { fontSchema } from '@/libs/validators/font.schema'
import * as yup from 'yup'
import { GalleryItem } from './galleryItem.type'

export type Font = {
  id: number
  name: string
  displayName: string
  lineHeight: number
  size: number
  isPersian: boolean
  isDefault: boolean
  difficultyRatio: number

  fileId: number | null
  file: GalleryItem | undefined

  thumbnailId: number | null
  thumbnail: GalleryItem | undefined
}

export type FontFormType = yup.InferType<typeof fontSchema>
