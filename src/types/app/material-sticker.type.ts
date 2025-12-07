import { User } from './user.type'
import * as yup from 'yup'
import { materialStickerSchema } from '@/libs/validators/material-sticker.schema'

export enum SurfaceType {
  MATTE = 'MATTE',
  GLOSSY = 'GLOSSY',
  RAINBOW = 'RAINBOW',
  REFLECTIVE = 'REFLECTIVE'
}

export type MaterialSticker = {
  id: number
  name: string
  colorCode: string
  surface: SurfaceType
  pricePerCM: number | null
  profitPercent: number
  backgroundFrom: string
  backgroundTo: string
  customStickers?: User | null
  displayOrder: number
  createdAt: string
  updatedAt: string
  isDefault: boolean
}

export type MaterialStickerFormType = yup.InferType<typeof materialStickerSchema>
