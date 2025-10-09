import { Address, AddressSnapshot } from './address.type'
import { Product } from './product.type'
import { AttributeValue } from './productAttributes.type'
import { ProductVariant } from './productVariant.type'
import { Shipping } from './shipping.type'
import { ShippingInfo } from './shippingInfo.type'
import { Transaction } from './transaction.type'
import { User } from './user.type'

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export type Order = {
  id: number
  userId: number
  addressId: number
  shippingId: number
  orderNumber: string
  quantity: number
  totalPrice: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  user?: User
  address?: Address
  transaction?: Transaction
  shippingInfo?: ShippingInfo
}

export type OrderDetails = {
  id: number
  userId: number
  shippingId: number
  orderNumber: string
  quantity: number
  totalPrice: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  expiresAt: string
  addressSnapshotId: number

  items: OrderItem[]

  shipping: Shipping
  shippingInfo?: ShippingInfo | null
  transaction: Transaction
  user: User
  addressSnapshot: AddressSnapshot
}

export type OrderItem = {
  id: number
  orderId: number
  productId: number | null
  productVariantId: number | null
  price: number
  quantity: number
  createdAt: string
  product: Product | null
  productVariant: ProductVariant | null
}

export const ORDER_STATUS_MAP = {
  DELIVERED: { label: 'تحویل شده', color: 'success', colorClassName: 'text-success' },
  CANCELLED: { label: 'لغو شده', color: 'error', colorClassName: 'text-error' },
  PROCESSING: { label: 'درحال پردازش', color: 'secondary', colorClassName: 'text-secondary' },
  PENDING: { label: 'در انتظار', color: 'warning', colorClassName: 'text-warning' },
  SHIPPED: { label: 'تحویل پست', color: 'info', colorClassName: 'text-info' },
  UNKNOWN: { label: 'نامشخص', color: 'info', colorClassName: 'text-info' }
} as const

export interface OrderMappedItem {
  id: number
  type: 'SIMPLE' | 'VARIABLE'
  title: string
  slug: string
  thumbnail: string
  basePrice: number
  salePrice: number
  discount: number
  count: number
  totalPrice: number
  attributeValues: AttributeValue[] | null
}
