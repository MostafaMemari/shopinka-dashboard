import { BulkPricingType } from '@/types/app/bulkPricing.type'
import * as yup from 'yup'

export const bulkPricingSchema = yup.object({
  productId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  variantId: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  minQty: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .min(1)
    .required('مقدار حداقل سفارش الزامی است'),

  discount: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notOneOf([0])
    .required('مقدار تخفیف باید بیشتر از 0 باشد'),

  isGlobal: yup.boolean().default(true),

  type: yup.mixed<BulkPricingType>().oneOf(Object.values(BulkPricingType)).required()
})
