import { RobotsTag } from '@/types/enums/robotsTag'
import { transformToStringArray } from '@/utils/transformToStringArray'
import * as yup from 'yup'

const productRobotsValues = Object.values(RobotsTag)

export const seoSchema = yup.object({
  seo_title: yup.string().notRequired().default(null),
  seo_description: yup.string().notRequired().default(null),
  seo_keywords: yup
    .array()
    .transform((_value, originalValue) => transformToStringArray(originalValue))
    .of(
      yup
        .string()
        .required('کلمه کلیدی سئو نمی‌تواند خالی باشد')
        .test('non-empty', 'کلمه کلیدی سئو نمی‌تواند خالی باشد', value => !!value && value.trim().length > 0)
    )
    .notRequired()
    .default([]),

  seo_canonicalUrl: yup.string().notRequired().default(null),
  seo_robotsTag: yup
    .string()
    .oneOf(productRobotsValues, 'دستور ربات‌های سئو باید یکی از مقادیر مجاز باشد')
    .required('دستور ربات‌های سئو الزامی است')
    .default(RobotsTag.INDEX_FOLLOW)
})
