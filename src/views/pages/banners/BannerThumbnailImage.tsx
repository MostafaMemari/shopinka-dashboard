'use client'

import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports

import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Icons & Components
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Image from 'next/image'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'

// Types
import { type GalleryFormType, GalleryItem } from '@/types/app/gallery.type'

interface Props {
  mainImage?: GalleryItem | null
  control?: any
}

const BannerThumbnailImage = ({ mainImage, control: externalControl }: Props) => {
  const context = useFormContext<GalleryFormType>()

  const control = externalControl ?? context?.control

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(mainImage || null)

  useEffect(() => {
    if ((mainImage && mainImage.id !== selectedImage?.id) || (!mainImage && selectedImage !== null)) {
      setSelectedImage(mainImage || null)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage])

  return (
    <Controller
      name='imageId'
      control={control}
      render={({ field: { onChange } }) => {
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginBottom: 2 }}>
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

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 2 }}>
              <ModalGallery initialSelected={selectedImage || undefined} btnLabel={selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} multi={false} onSelect={handleSelect}>
                <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
                  {selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر'} از گالری
                </Typography>
              </ModalGallery>
            </Box>
          </Box>
        )
      }}
    />
  )
}

export default BannerThumbnailImage
