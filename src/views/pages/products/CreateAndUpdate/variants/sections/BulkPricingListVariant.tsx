'use client'

import { useEffect, useState } from 'react'
import { Button, Box, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useBulkPricing } from '@/hooks/reactQuery/bulk-pricing/useBulkPricing'
import { BulkPricingItem, BulkPricingType } from '@/types/app/bulkPricing.type'
import BulkPricingItemForm from '../../../bulkPricing/BulkPricingItemForm'

const BulkPricingListVariant = ({ productId, variantId }: { productId?: number | null; variantId?: number | null }) => {
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
    <Box sx={{ p: 4, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <Typography variant='h6' sx={{ mb: 2 }}>
          قیمت‌گذاری
        </Typography>

        <Button startIcon={<AddIcon />} variant='contained' color='primary' onClick={handleAddForm}>
          افزودن قیمت جدید
        </Button>
      </Box>
      {items.map((item, index) => (
        <BulkPricingItemForm
          key={item.id ? `item-${item.id}` : `new-${index}`}
          item={item}
          productId={productId ? productId : null}
          variantId={variantId}
          onDelete={() => handleDelete(index)}
        />
      ))}
    </Box>
  )
}

export default BulkPricingListVariant
