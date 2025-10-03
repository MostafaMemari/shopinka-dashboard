import { User } from './user.type'

// در فایل src/types/app/shipping.type.ts
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

export type ShippingForm = {
  name: string
  price: number | null
  estimatedDays: number | null
  isActive: boolean
}
