'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import BannerForm from './BannerForm'
import FormActions from '@/components/FormActions'
import { Banner } from '@/types/app/banner.type'
import { useBannerForm } from '@/hooks/reactQuery/useBanner'

interface UpdateBannerModalProps {
  children: ReactNode
  initialData: Banner
}

const UpdateBannerModal = ({ children, initialData }: UpdateBannerModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, setValue, isLoading, onSubmit } = useBannerForm({
    initialData,
    isUpdate: true,
    handleModalClose: handleClose
  })

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-edit' />}>
            بروزرسانی بنر
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش بنر'
        defaultMaxWidth='lg'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleClose} isLoading={isLoading} submitText={initialData ? 'بروزرسانی' : 'ثبت'} />}
      >
        <BannerForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} initialData={initialData} />
      </CustomDialog>
    </div>
  )
}

export default UpdateBannerModal
