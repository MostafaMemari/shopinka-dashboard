import { Font } from './font.type'
import { GalleryItem } from './galleryItem.type'
import { MaterialSticker } from './material-sticker.type'

export type Line = {
  text: string
  ratio: number
  width: number
  height: number
  lineNumber: number
}

export type CustomStickerStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'PUBLISHED'

export type CustomSticker = {
  id: number
  name: string
  userId: number
  fontId: number
  materialId: number
  previewImageId: number
  style: 'normal' | 'italic'
  weight: 'regular' | 'bold'
  letterSpacing: number
  finalPrice: number
  lines: Line[]
  description: string
  status: CustomStickerStatus
  createdAt: string
  updatedAt: string

  previewImage: GalleryItem
  material: MaterialSticker
  font: Font
}
