'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardHeader, CardContent, IconButton, Box, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useFormContext } from 'react-hook-form'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import { GalleryItem } from '@/types/app/gallery.type'

const ProductGallery = ({ galleryImages }: { galleryImages?: GalleryItem[] }) => {
  const [selectedImages, setSelectedImages] = useState<GalleryItem[]>([])
  const { setValue } = useFormContext()

  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setSelectedImages(galleryImages)
      const ids = galleryImages.map(img => img.id).filter(Boolean)

      setValue('galleryImageIds', ids)
    }
  }, [galleryImages, setValue])

  const handleSelect = useCallback(
    (items: GalleryItem | GalleryItem[]) => {
      const newItems = Array.isArray(items) ? items : [items]
      const validIds = newItems.map(item => item.id).filter(id => typeof id === 'number' && id > 0)

      setSelectedImages(newItems)
      setValue('galleryImageIds', Array.from(new Set(validIds)))
    },
    [setValue]
  )

  const handleRemove = useCallback(
    (id: number) => {
      const updatedImages = selectedImages.filter(item => item.id !== id)
      const updatedIds = updatedImages.map(item => item.id).filter(id => typeof id === 'number' && id > 0)

      setSelectedImages(updatedImages)
      setValue('galleryImageIds', Array.from(new Set(updatedIds)))
    },
    [selectedImages, setValue]
  )

  const ImageCard = ({ item }: { item: GalleryItem }) => (
    <Box sx={{ position: 'relative', width: 120, height: 120, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
      <Image src={item.fileUrl} alt={item.title || 'تصویر گالری'} fill style={{ objectFit: 'cover' }} />
      <Tooltip title='حذف تصویر'>
        <IconButton
          size='small'
          color='error'
          onClick={() => handleRemove(item.id)}
          sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' } }}
        >
          <DeleteOutlineIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    </Box>
  )

  return (
    <Card>
      <CardHeader title='گالری تصاویر محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {selectedImages.length > 0 ? selectedImages.map(item => <ImageCard key={item.id} item={item} />) : <EmptyPlaceholder text='تصاویری یافت نشد' width={120} height={120} />}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <ModalGallery btnLabel='انتخاب تصاویر' multi initialSelected={selectedImages} onSelect={handleSelect}>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              انتخاب تصاویر از گالری
            </Typography>
          </ModalGallery>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductGallery
