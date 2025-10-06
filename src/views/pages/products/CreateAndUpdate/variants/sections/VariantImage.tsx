'use client'

import { useState, useEffect } from 'react'
import { type Control, Controller, type UseFormSetValue } from 'react-hook-form'
import Box from '@mui/material/Box'
import Image from 'next/image'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { ProductVariantForm } from '@/types/app/productVariant.type'
import { GalleryItem } from '@/types/app/gallery.type'
import { Card, CardContent, CardHeader, Typography } from '@mui/material'

interface Props {
  mainImage?: GalleryItem | null
  setValue: UseFormSetValue<ProductVariantForm>
}

const VariantImage = ({ mainImage, setValue }: Props) => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  useEffect(() => {
    if (mainImage) setSelectedImage(mainImage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = (item: GalleryItem | GalleryItem[]) => {
    const image = Array.isArray(item) ? item[0] : item

    setSelectedImage(image)
    const mainImageId = typeof image.id === 'number' && image.id > 0 ? image.id : null

    setValue('mainImageId', mainImageId)
  }

  const handleRemove = () => {
    setSelectedImage(null)
    setValue('mainImageId', null)
  }

  return (
    <Card>
      <CardHeader title='تصویر اصلی محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {selectedImage ? (
          <Box sx={{ position: 'relative', width: 200, height: 200, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
            <Image src={selectedImage.fileUrl} alt={selectedImage.title || 'تصویر محصول'} fill style={{ objectFit: 'cover' }} />
            <Tooltip title='حذف تصویر'>
              <IconButton
                size='small'
                color='error'
                onClick={handleRemove}
                sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' } }}
              >
                <DeleteOutlineIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <EmptyPlaceholder text='تصویری یافت نشد' width={200} height={200} />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ModalGallery initialSelected={selectedImage || undefined} btnLabel={selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} multi={false} onSelect={handleSelect}>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              {selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} از گالری
            </Typography>
          </ModalGallery>
        </Box>
      </CardContent>
    </Card>
  )
}

export default VariantImage
