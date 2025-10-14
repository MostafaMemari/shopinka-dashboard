'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import { GalleryItem } from '@/types/app/galleryItem.type'
import { useGalleryItemFormSubmit } from '@/hooks/reactQuery/gallery/galleryItem/useGalleryItemFormSubmit'
import { useGalleryItemFormFields } from '@/hooks/reactQuery/gallery/galleryItem/useGalleryItemFormFields'

interface Props {
  activeItem: GalleryItem
}

interface FormData {
  title: string | null
  description: string | null
}

const GalleryItemForm = ({ activeItem }: Props) => {
  const { isPending, mutate } = useGalleryItemFormSubmit({ initialData: activeItem })
  const { methods } = useGalleryItemFormFields({ initialData: activeItem })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isDirty }
  } = methods

  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedSave = useCallback(
    (data: FormData) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)

      debounceRef.current = setTimeout(() => {
        mutate(data, {})
      }, 1000)
    },
    [mutate]
  )

  useEffect(() => {
    reset({
      title: activeItem.title,
      description: activeItem.description || ''
    })
  }, [activeItem, reset])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  const onSubmit = (data: FormData) => {
    if (isDirty) {
      debouncedSave(data)
    }
  }

  return (
    <Box component='form' onChange={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 5, position: 'relative' }}>
      {isPending && (
        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
          <CircularProgress size={20} />
        </Box>
      )}

      <Controller
        name='title'
        control={control}
        render={({ field }) => <TextField {...field} label='عنوان' fullWidth error={!!errors.title} helperText={errors.title?.message} />}
      />

      <Controller
        name='description'
        control={control}
        render={({ field }) => <TextField {...field} label='توضیحات' multiline rows={4} fullWidth error={!!errors.description} helperText={errors.description?.message} />}
      />
    </Box>
  )
}

export default GalleryItemForm
