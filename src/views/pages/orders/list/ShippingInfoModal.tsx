'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import FormActions from '@/components/FormActions'
import { useShippingInfoForm } from '@/hooks/reactQuery/useShippingInfo'
import { ShippingInfo, type ShippingInfoType } from '@/types/app/shippingInfo.type'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { shippingInfoSchema } from '@/libs/validators/shippingInfo.schema'
import ShippingInfoForm from '../form/ShippingInfoForm'

interface ShippingInfoModalProps {
  id: number
  shippingInfo?: ShippingInfo
  children?: ReactNode
}

const ShippingInfoModal = ({ children, id, shippingInfo }: ShippingInfoModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const handleOpen = useCallback(() => setOpen(true), [])

  const initialData = {
    orderId: id,
    ...shippingInfo
  }

  const defaultValues: ShippingInfoType = {
    orderId: initialData?.orderId ?? null,
    trackingCode: initialData?.trackingCode ?? ''
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ShippingInfoType>({
    defaultValues,
    resolver: yupResolver(shippingInfoSchema)
  })

  const { mutate, isPending } = useShippingInfoForm({
    initialData: shippingInfo,
    onSuccess: () => {
      reset()
      handleClose()
    }
  })

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div>
      <div onClick={handleOpen}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت حمل و نقل
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='حمل و نقل'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={handleSubmit(data => mutate(data))} isLoading={isPending} />}
      >
        <ShippingInfoForm control={control} errors={errors} isLoading={isPending} />
      </CustomDialog>
    </div>
  )
}

export default ShippingInfoModal
