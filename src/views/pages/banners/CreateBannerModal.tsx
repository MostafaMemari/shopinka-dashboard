'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@core/components/mui/CustomDialog'
import BannerForm from './BannerForm'
import FormActions from '@/components/FormActions'
import { useBannerForm } from '@/hooks/reactQuery/useBanner'

interface CreateBannerModalProps {
  children?: ReactNode
}

const CreateBannerModal = ({ children }: CreateBannerModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const { control, errors, setValue, isLoading, onSubmit } = useBannerForm({ handleModalClose: handleClose })

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت بنر جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت بنر جدید'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isLoading} />}
      >
        <BannerForm control={control} errors={errors} setValue={setValue} isLoading={isLoading} />
      </CustomDialog>
    </div>
  )
}

export default CreateBannerModal
