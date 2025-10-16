import { bulkPricingSchema } from '@/libs/validators/bulkPricing.schema'
import * as yup from 'yup'

export enum BulkPricingType {
  PERCENT = 'PERCENT',
  FIXED = 'FIXED'
}

export type BulkPricingFormType = yup.InferType<typeof bulkPricingSchema>
