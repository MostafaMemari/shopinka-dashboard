'use client'

import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

// MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

// Icons & Components
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Image from 'next/image'
import ModalGallery from '@/components/Gallery/ModalGallery/ModalGallery'
import EmptyPlaceholder from '@/components/EmptyPlaceholder'

// Types
import { GalleryItem } from '@/types/app/gallery.type'

import type { FieldValues } from 'react-hook-form'

interface FormImagePickerProps<FormValues extends FieldValues> {
  name: keyof FormValues
  mainImage?: GalleryItem | null
  control?: any
  btnLabel?: string
  emptyText?: string
  width?: number
  height?: number
}

function FormImagePicker<FormValues extends FieldValues>({
  name,
  mainImage = null,
  control: externalControl,
  btnLabel,
  emptyText = 'تصویری یافت نشد',
  width = 200,
  height = 200
}: FormImagePickerProps<FormValues>) {
  const formContext = useFormContext<FormValues>()
  const control = externalControl ?? formContext?.control

  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(mainImage)

  useEffect(() => {
    if (mainImage?.id !== selectedImage?.id) setSelectedImage(mainImage)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage])

  return (
    <Controller
      name={name as string}
      control={control}
      render={({ field: { onChange } }) => {
        const handleSelect = (item: GalleryItem | GalleryItem[]) => {
          const image = Array.isArray(item) ? item[0] : item

          setSelectedImage(image)
          onChange(image?.id ?? null)
        }

        const handleRemove = () => {
          setSelectedImage(null)
          onChange(null)
        }

        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
            {selectedImage ? (
              <Box sx={{ position: 'relative', width, height, borderRadius: 2, overflow: 'hidden', boxShadow: 1 }}>
                <Image src={selectedImage.fileUrl} alt={selectedImage.title ?? 'تصویر'} fill style={{ objectFit: 'cover' }} />
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
              <EmptyPlaceholder text={emptyText} width={width} height={height} />
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <ModalGallery
                initialSelected={selectedImage ?? undefined}
                btnLabel={btnLabel ?? (selectedImage ? 'تغییر تصویر' : 'انتخاب تصویر')}
                multi={false}
                onSelect={handleSelect}
              >
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

export default FormImagePicker
