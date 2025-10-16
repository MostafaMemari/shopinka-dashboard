'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useBulkPricing } from '@/hooks/reactQuery/bulk-pricing/useBulkPricing'
import { BulkPricingItem, BulkPricingType } from '@/types/app/bulkPricing.type'
import BulkPricingItemForm from './BulkPricingItemForm'

const BulkPricingList = ({ productId, variantId }: { productId?: number | null; variantId?: number | null }) => {
  const { data } = useBulkPricing({ params: { productId: productId ? productId : undefined, variantId: variantId ? variantId : undefined, take: 1000 } })
  const [items, setItems] = useState<BulkPricingItem[]>([])

  useEffect(() => {
    if (data?.data.items) setItems(data.data.items)
  }, [data])

  const handleAddForm = () => {
    const newItem: BulkPricingItem = {
      id: 0,
      productId: null,
      minQty: 1,
      discount: '0',
      type: BulkPricingType.PERCENT,
      isGlobal: false,
      variantId: null,
      userId: 0,
      createdAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    }

    setItems(prev => [...prev, newItem])
  }

  const handleDelete = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <Card>
      <CardHeader
        title='فروش عمده'
        action={
          <Button startIcon={<AddIcon />} variant='contained' color='primary' onClick={handleAddForm}>
            افزودن قیمت جدید
          </Button>
        }
      />
      <CardContent>
        {items.map((item, index) => (
          <BulkPricingItemForm
            key={item.id ? `item-${item.id}` : `new-${index}`}
            item={item}
            productId={productId ? productId : null}
            variantId={variantId}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </CardContent>
    </Card>
  )
}

export default BulkPricingList
