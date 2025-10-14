import { GalleryItemSchema } from '@/libs/validators/galleryItem.schema'
import { type InferType } from 'yup'

export type GalleryItemForm = {
  galleryId: string
  title: string
  description: string | null
  image: FormData
}

export interface GalleryItem {
  id: number
  galleryId: number
  title: string
  description: string | null
  fileUrl: string
  fileKey: string
  thumbnailUrl: string
  thumbnailKey: string
  mimetype: string
  size: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  isDeleted: boolean
}

export type GalleryItemFormType = InferType<typeof GalleryItemSchema>
