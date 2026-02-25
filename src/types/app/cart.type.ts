import { CustomSticker } from './customSticker.type'
import { Product } from './product.type'
import { ProductVariant } from './productVariant.type'
import { User } from './user.type'

export type Cart = {
  id: number
  userId: number
  createdAt: string
  updatedAt: string
  user: User
  items: CartItem[]
}

export type CartItem = {
  id: number
  cartId: number
  productId: number | null
  productVariantId: number | null
  customStickerId: number | null
  quantity: number
  createdAt: string
  updatedAt: string
  product: Product | null
  user: User
  productVariant: ProductVariant | null
  customSticker: CustomSticker | null
}
