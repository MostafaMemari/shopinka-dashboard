'use client'

import { useEffect, useState } from 'react'
import { Card, CardHeader, CardContent, IconButton, Box, Tooltip, Typography } from '@mui/material'
import Image from 'next/image'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { Controller, useFormContext } from 'react-hook-form'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import GalleryDialog from '@/components/Gallery/GalleryDialog'
import { GalleryItem } from '@/types/app/galleryItem.type'

const ProductGallery = ({ galleryImages }: { galleryImages?: GalleryItem[] }) => {
  const { control, setValue } = useFormContext()
  const [localImages, setLocalImages] = useState<GalleryItem[]>(galleryImages || [])

  useEffect(() => {
    if (galleryImages && galleryImages.length > 0) {
      setLocalImages(galleryImages)
      const ids = galleryImages.map(img => img.id).filter(Boolean)

      setValue('galleryImageIds', ids)
    } else {
      setLocalImages([])
      setValue('galleryImageIds', [])
    }
  }, [galleryImages, setValue])

  return (
    <Card>
      <CardHeader title='گالری تصاویر محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Controller
          name='galleryImageIds'
          control={control}
          defaultValue={localImages.map(img => img.id) || []}
          render={({ field: { value, onChange } }) => {
            const selectedImages = localImages.filter(img => value.includes(img.id))

            const handleSelect = (items: GalleryItem | GalleryItem[]) => {
              const newItems = Array.isArray(items) ? items : [items]

              setLocalImages(newItems)

              const validIds = newItems.map(item => item.id).filter(id => typeof id === 'number' && id > 0)

              onChange(validIds)
            }

            const handleRemove = (id: number) => {
              const updatedIds = value.filter((itemId: number) => itemId !== id)

              onChange(updatedIds)

              setLocalImages(prev => prev.filter(img => img.id !== id))
            }

            return (
              <>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {selectedImages.length > 0 ? (
                    selectedImages.map(item => (
                      <Box key={item.id} sx={{ position: 'relative', width: 120, height: 120, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                        <Image src={item.fileUrl} alt={item.title || 'تصویر گالری'} fill style={{ objectFit: 'cover' }} />
                        <Tooltip title='حذف تصویر'>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => handleRemove(item.id)}
                            sx={{
                              position: 'absolute',
                              top: 4,
                              right: 4,
                              bgcolor: 'rgba(255,255,255,0.8)',
                              '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' }
                            }}
                          >
                            <DeleteOutlineIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))
                  ) : (
                    <EmptyPlaceholder text='تصاویری یافت نشد' width={120} height={120} />
                  )}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                  <GalleryDialog
                    btnLabel='انتخاب تصاویر'
                    multi
                    initialSelected={selectedImages}
                    onSelect={handleSelect}
                    trigger={
                      <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        انتخاب تصاویر از گالری
                      </Typography>
                    }
                  />
                </Box>
              </>
            )
          }}
        />
      </CardContent>
    </Card>
  )
}

export default ProductGallery
