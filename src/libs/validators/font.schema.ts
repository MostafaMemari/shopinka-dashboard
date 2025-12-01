import * as yup from 'yup'

export const fontSchema = yup.object({
  name: yup.string().required('نام الزامی است'),
  displayName: yup.string().required('نام نمایشی الزامی است'),

  lineHeight: yup.number().typeError('ارتفاع خط باید عدد باشد').required('ارتفاع خط الزامی است').positive('ارتفاع خط باید عددی مثبت باشد'),
  size: yup.number().typeError('اندازه باید عدد باشد').required('اندازه الزامی است').positive('اندازه باید عددی مثبت باشد'),
  isPersian: yup.boolean().default(true),

  difficultyRatio: yup.number().typeError('ضریب سختی باید عدد باشد').required('ضریب سختی الزامی است').positive('ضریب سختی باید عددی مثبت باشد'),

  fileId: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null),
  thumbnailId: yup.number().notRequired().positive('عدد باید مثبت باشد').default(null)
})
