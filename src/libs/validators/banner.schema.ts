import * as yup from 'yup'
import { BannerType } from '@/types/app/banner.type'

export const bannerSchema = yup.object({
  link: yup.string().required('لینک الزامی است').min(3, 'لینک باید حداقل 3 کاراکتر باشد').max(50, 'نام نمی‌تواند بیشتر از 50 کاراکتر باشد'),

  type: yup.string().oneOf(Object.values(BannerType), 'نوع بنر نامعتبر است').required('نوع بنر الزامی است'),

  imageId: yup.number().positive().notRequired().default(null),

  isActive: yup.boolean().default(true)
})
