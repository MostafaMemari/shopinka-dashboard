import { OrderItem, OrderMappedItem } from '@/types/app/order.type'

export function mappedOrderItem(orderItem: OrderItem[]): OrderMappedItem[] {
  return orderItem.map(item => {
    const isSimple = item.product?.type === 'SIMPLE'
    const isCustom = !!item.customSticker
    const product = item.product || item.productVariant?.product
    const customSticker = item?.customSticker
    const variant = item.productVariant

    const id = item.product?.id ?? variant?.id ?? 0
    const type: 'SIMPLE' | 'VARIABLE' | 'CUSTOM_STICKER' = isSimple ? 'SIMPLE' : isCustom ? 'CUSTOM_STICKER' : 'VARIABLE'
    const title = (isCustom ? customSticker?.name : product?.name) ?? ''
    const thumbnail = (isCustom ? customSticker?.previewImage?.fileUrl : product?.mainImage?.fileUrl) ?? ''
    const slug = isCustom ? '#' : (product?.slug ?? '')

    const basePrice = item.product?.basePrice ?? variant?.basePrice ?? customSticker?.finalPrice ?? 0
    const salePrice = item.product?.salePrice ?? variant?.salePrice ?? 0
    const discount = basePrice ? Math.round(((basePrice - salePrice) / basePrice) * 100) : 0

    return {
      id,
      count: item.quantity,
      slug,
      type,
      title,
      thumbnail,
      basePrice,
      salePrice,
      discount,
      totalPrice: salePrice ? item.quantity * salePrice : item.quantity * basePrice,
      attributeValues: variant?.attributeValues ?? []
    }
  })
}
