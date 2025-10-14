import * as yup from 'yup'

export const GalleryItemSchema = yup
  .object({
    title: yup.string().nullable().default(null),
    description: yup.string().nullable().default(null)
  })
  .required()
