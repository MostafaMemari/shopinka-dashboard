import { shippingSchema } from '@/libs/validators/shipping.schema'
import { User } from './user.type'
import * as yup from 'yup'

export type Shipping = {
  id: number
  userId: number
  name: string
  price: number
  estimatedDays: number | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  user?: User | null
}

export type ShippingFormType = yup.InferType<typeof shippingSchema>
