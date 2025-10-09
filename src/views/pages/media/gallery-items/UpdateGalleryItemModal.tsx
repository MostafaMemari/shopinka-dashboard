import { useState, useCallback, ReactNode } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { useForm } from 'react-hook-form'
import { IconButton } from '@mui/material'
import { GalleryFormType, type GalleryItemForm } from '@/types/app/gallery.type'
import { yupResolver } from '@hookform/resolvers/yup'
import { showToast } from '@/utils/showToast'
import { handleApiError } from '@/utils/handleApiError'
import { errorGalleryMessage } from '@/messages/galleryMessages'
import { getChangedFields } from '@/utils/getChangedFields'
import { gallerySchema } from '@/libs/validators/gallery.schema'
import EditIcon from '@mui/icons-material/Edit'
import { updateGalleryItem } from '@/libs/api/galleyItem.api'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { cleanObject } from '@/utils/formatters'
import FormActions from '@/components/FormActions'
import FormField from '@/components/form/FormField'

interface UpdateGalleryItemModalProps {
  initialData: Partial<GalleryItemForm>
  galleryItemId: string
  children?: ReactNode
}

const UpdateGalleryItemModal = ({ initialData, galleryItemId, children }: UpdateGalleryItemModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(gallerySchema),
    defaultValues: {
      title: initialData.title ?? '',
      description: initialData.description ?? ''
    }
  })

  const handleOpen = useCallback(() => setOpen(true), [])

  const handleClose = useCallback(() => {
    setOpen(false)
    reset()
  }, [reset])

  const onSubmit = useCallback(
    async (formData: GalleryFormType) => {
      setIsLoading(true)

      try {
        if (galleryItemId) {
          const cleanedData = cleanObject(formData)
          const changedData = getChangedFields(initialData, cleanedData)

          if (formData.description === null && !('description' in cleanedData)) changedData.description = ''

          if (Object.keys(changedData).length === 0) {
            showToast({ type: 'info', message: 'هیچ تغییری اعمال نشده است' })
            setIsLoading(false)

            return
          }

          const { status } = await updateGalleryItem(galleryItemId, changedData)

          const errorMessage = handleApiError(status, errorGalleryMessage)

          if (errorMessage) {
            showToast({ type: 'error', message: errorMessage })
            setIsLoading(false)

            return
          }

          if (status === 200) {
            showToast({ type: 'success', message: 'فایل با موفقیت ویرایش شد' })
            invalidate(QueryKeys.GalleryItems)
            handleClose()
          }
        }
      } catch (error: any) {
        showToast({ type: 'error', message: 'خطای سیستمی رخ داد' })
      } finally {
        setIsLoading(false)
      }
    },
    [handleClose, initialData, invalidate, galleryItemId]
  )

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <IconButton size='small'>
            <EditIcon fontSize='small' />
          </IconButton>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='بروزرسانی فایل'
        defaultMaxWidth='xs'
        actions={<FormActions formId='update-gallery-item-form' onCancel={handleClose} submitText='بروزرسانی' onSubmit={handleSubmit(onSubmit)} isLoading={isLoading} />}
      >
        <form onSubmit={handleSubmit(onSubmit)} id='update-gallery-item-form' className='flex flex-col gap-5'>
          <FormField name='title' label='نام فایل' placeholder='لطفا نام فایل را وارد کنید' control={control} errors={errors} />

          <FormField name='description' label='توضیحات' placeholder='لطفا توضیحات فایل را وارد کنید' control={control} errors={errors} multiline rows={4} />
        </form>
      </CustomDialog>
    </div>
  )
}

export default UpdateGalleryItemModal
