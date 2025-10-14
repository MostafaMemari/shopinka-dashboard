'use client'

import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Icons & Components
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Image from 'next/image'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'
import GalleryDialog from '@/components/Gallery/GalleryDialog'

// Types
import { GalleryItem } from '@/types/app/galleryItem.type'

const ProductMainImage = ({ mainImage }: { mainImage?: GalleryItem | null }) => {
  const { control } = useFormContext()
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(mainImage || null)

  useEffect(() => {
    if ((mainImage && mainImage.id !== selectedImage?.id) || (!mainImage && selectedImage !== null)) {
      setSelectedImage(mainImage || null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage])

  return (
    <Card>
      <CardHeader title='تصویر اصلی محصول' />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Controller
          name='mainImageId'
          control={control}
          defaultValue={mainImage?.id || null}
          render={({ field: { value, onChange } }) => {
            const handleSelect = (item: GalleryItem | GalleryItem[]) => {
              const image = Array.isArray(item) ? item[0] : item

              setSelectedImage(image)
              onChange(image?.id || null)
            }

            const handleRemove = () => {
              setSelectedImage(null)
              onChange(null)
            }

            return (
              <>
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
                  <GalleryDialog
                    initialSelected={selectedImage || undefined}
                    btnLabel={selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'}
                    multi={false}
                    onSelect={handleSelect}
                    trigger={
                      <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                        {selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} از گالری
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

export default ProductMainImage
