import { bulkPricingSchema } from '@/libs/validators/bulkPricing.schema'
import * as yup from 'yup'

export enum BulkPricingType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED'
}

export type BulkPricingItem = {
  id: number
  productId: number | null
  variantId: number | null
  userId: number
  minQty: number
  discount: string
  isGlobal: boolean
  type: BulkPricingType
  createdAt: string
  updateAt: string
}

export type BulkPricingFormType = yup.InferType<typeof bulkPricingSchema>
