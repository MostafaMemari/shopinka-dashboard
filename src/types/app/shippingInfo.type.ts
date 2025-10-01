import * as yup from 'yup'
import { shippingInfoSchema } from '@/libs/validators/shippingInfo.schema'

export type ShippingInfo = {
  id: number
  orderId: number
  trackingCode: string
  sentAt: Date
  createdAt: string
  updatedAt: string
}

export type Shipping = {
  id: number
  userId: number
  name: string
  price: number
  estimatedDays: number
  isActive: boolean
  createdAt: number
  updatedAt: number
}

export type ShippingInfoForm = yup.InferType<typeof shippingInfoSchema>
