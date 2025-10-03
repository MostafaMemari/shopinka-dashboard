'use client'

import { useState, useCallback, ReactNode, useEffect, useMemo } from 'react'
import Button from '@mui/material/Button'
import FormActions from '@/components/FormActions'
import { useShippingInfoForm } from '@/hooks/reactQuery/useShippingInfo'
import { ShippingInfo, type ShippingInfoType } from '@/types/app/shippingInfo.type'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { shippingInfoSchema } from '@/libs/validators/shippingInfo.schema'
import ShippingInfoForm from '../form/ShippingInfoForm'
import { useRouter } from 'next/navigation'

interface ShippingInfoModalProps {
  orderId: number
  shippingInfo?: ShippingInfo
  children?: ReactNode
}

const ShippingInfoModal = ({ orderId, shippingInfo, children }: ShippingInfoModalProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const defaultValues = useMemo<ShippingInfoType>(
    () => ({
      orderId: orderId ?? null,
      trackingCode: shippingInfo?.trackingCode ?? ''
    }),
    [orderId, shippingInfo?.trackingCode]
  )

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ShippingInfoType>({
    defaultValues,
    resolver: yupResolver(shippingInfoSchema)
  })

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  const { mutate, isPending } = useShippingInfoForm({
    initialData: shippingInfo,
    onSuccess: () => {
      router.refresh()
      handleClose()
    }
  })

  const onSubmit = handleSubmit(data => mutate(data))

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
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <ShippingInfoForm onSubmit={onSubmit} control={control} errors={errors} isLoading={isPending} />
      </CustomDialog>
    </div>
  )
}

export default ShippingInfoModal
