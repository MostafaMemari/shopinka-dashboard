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

  type: yup.mixed<BulkPricingType>().oneOf(Object.values(BulkPricingType)).required('نوع تخفیف الزامی است'),

  discount: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === '' || originalValue == null) return null

      return Number(originalValue)
    })
    .typeError('مقدار تخفیف باید عدد باشد')
    .when('type', {
      is: BulkPricingType.PERCENT,
      then: schema => schema.min(1, 'برای نوع درصدی باید حداقل 1 باشد').max(99, 'برای نوع درصدی باید حداکثر 99 باشد').required('مقدار تخفیف الزامی است'),
      otherwise: schema => schema.min(1000, 'برای نوع مبلغی باید حداقل 1000 باشد').required('مقدار تخفیف الزامی است')
    }),

  isGlobal: yup.boolean().default(true)
})
