'use client'

import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useGalleryForm } from '@/hooks/reactQuery/gallery/useGallery'
import { FormProvider, useForm } from 'react-hook-form'
import { Gallery, GalleryFormType } from '@/types/app/gallery.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { gallerySchema } from '@/libs/validators/gallery.schema'
import FormField from '@/components/form/FormField'

interface Props {
  gallery?: Gallery
  trigger?: ReactNode
}

const CreateUpdateGalleryDialog = ({ gallery, trigger }: Props) => {
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

  const { isPending, mutate } = useGalleryForm({
    initialData: gallery,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {trigger && (
          <div onClick={handleOpen} role='button' tabIndex={0}>
            {trigger}
          </div>
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
          <form onSubmit={onSubmit} id='gallery-form' className='flex flex-col gap-5'>
            <FormField name='title' label='نام گالری' placeholder='لطفا نام گالری را وارد کنید' />

            <FormField name='description' label='توضیحات' multiline placeholder='لطفا توضیحات گالری را وارد کنید' rows={2} />
          </form>
        </FormProvider>
      </CustomDialog>
    </div>
  )
}

export default CreateUpdateGalleryDialog
