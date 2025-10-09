'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useGalleryForm } from '@/hooks/reactQuery/gallery/useGallery'
import { FormProvider, useForm } from 'react-hook-form'
import { GalleryFormType } from '@/types/app/gallery.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { gallerySchema } from '@/libs/validators/gallery.schema'
import GalleryForm from './GalleryForm'

interface CreateGalleryModalProps {
  children?: ReactNode
}

const CreateGalleryModal = ({ children }: CreateGalleryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useForm<GalleryFormType>({
    resolver: yupResolver(gallerySchema)
  })

  const { isPending, mutate } = useGalleryForm({
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت گالری جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت گالری جدید'
        defaultMaxWidth='xs'
        actions={<FormActions formId='gallery-form' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <FormProvider {...methods}>
          <GalleryForm onSubmit={onSubmit} />
        </FormProvider>
      </CustomDialog>
    </div>
  )
}

export default CreateGalleryModal
