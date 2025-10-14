import { gallerySchema } from '@/libs/validators/gallery.schema'
import { type InferType } from 'yup'

export type Gallery = {
  id: number
  title: string
  description: string | null
  userId: number
  createdAt: string
  updatedAt: string
}

export type GalleryFormType = InferType<typeof gallerySchema>
