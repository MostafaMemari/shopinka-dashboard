import * as yup from 'yup'

export const shippingSchema = yup.object({
  name: yup.string().required('نام الزامی است'),

  price: yup.number().typeError('قیمت باید عدد باشد').required('قیمت الزامی است').positive('قیمت باید عددی مثبت باشد'),

  estimatedDays: yup
    .number()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .notRequired()
    .positive('باید عددی مثبت باشد')
    .default(null),

  isActive: yup.boolean().default(true)
})
