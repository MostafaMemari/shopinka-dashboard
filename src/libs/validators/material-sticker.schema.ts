import { SurfaceType } from '@/types/app/material-sticker.type'
import * as yup from 'yup'

const surfaceTypeValues = Object.values(SurfaceType)

export const materialStickerSchema = yup.object({
  name: yup.string().required('نام الزامی است'),
  colorCode: yup.string().required('کد رنگ الزامی است'),
  surface: yup.mixed<SurfaceType>().oneOf(surfaceTypeValues, 'جنس محصول نامعتبر است').required('جنس متریال الزامی است').default(null),
  pricePerCM: yup.number().typeError('قیمت باید عدد باشد').notRequired().positive('قیمت باید عددی مثبت باشد').default(null),
  profitPercent: yup
    .number()
    .typeError('درصد سود باید عدد باشد')
    .required('درصد سود الزامی است')
    .min(0, 'درصد سود نمی‌تواند کمتر از 0 باشد')
    .max(100000, 'درصد سود نمی‌تواند بیشتر از 100000 باشد')
    .default(0),
  backgroundFrom: yup.string().required('رنگ پس‌زمینه از الزامی است'),
  backgroundTo: yup.string().required('رنگ پس‌زمینه تا الزامی است')
})
