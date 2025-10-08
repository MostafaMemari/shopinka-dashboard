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

export type GalleryFormType = InferType<typeof gallerySchema>
