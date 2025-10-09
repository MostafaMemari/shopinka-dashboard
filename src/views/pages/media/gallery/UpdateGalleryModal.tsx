'use client'

import { useState, useCallback, ReactNode } from 'react'
import { IconButton } from '@mui/material'
import CustomDialog from '@/components/dialogs/CustomDialog'
import GalleryForm from './GalleryForm'
import FormActions from '@/components/FormActions'
import { Gallery, GalleryFormType } from '@/types/app/gallery.type'
import { useGalleryForm } from '@/hooks/reactQuery/gallery/useGallery'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { gallerySchema } from '@/libs/validators/gallery.schema'

interface UpdateGalleryModalProps {
  children?: ReactNode
  gallery: Gallery
}

const UpdateGalleryModal = ({ children, gallery }: UpdateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const defaultValues = {
    title: gallery?.title ?? '',
    description: gallery?.description ?? ''
  }

  const methods = useForm<GalleryFormType>({
    defaultValues,
    resolver: yupResolver(gallerySchema)
  })

  const { mutate, isPending } = useGalleryForm({
    initialData: gallery,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()} aria-label='باز کردن فرم ویرایش گالری'>
        {children || (
          <IconButton size='small'>
            <i className='tabler-edit text-gray-500 text-lg' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='بروزرسانی گالری'
        defaultMaxWidth='xs'
        actions={<FormActions formId='gallery-form' onCancel={handleClose} submitText='بروزرسانی' onSubmit={onSubmit} isLoading={isPending} />}
      >
        <FormProvider {...methods}>
          <GalleryForm onSubmit={onSubmit} />
        </FormProvider>
      </CustomDialog>
    </div>
  )
}

export default UpdateGalleryModal
