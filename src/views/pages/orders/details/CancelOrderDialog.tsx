'use client'

import React from 'react'
import { Button } from '@mui/material'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useChangeOrderStatus } from '@/hooks/reactQuery/useOrder'
import { useRouter } from 'next/navigation'

function CancelOrderDialog({ orderId }: { orderId: number }) {
  const [open, setOpen] = React.useState(false)
  const mutation = useChangeOrderStatus()
  const router = useRouter()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = () => {
    mutation.mutate(
      { orderId, status: 'CANCELLED' },
      {
        onSuccess: () => {
          handleClose()
          router.refresh()
        }
      }
    )
  }

  return (
    <>
      <span onClick={handleOpen} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Button variant='contained' color='error'>
          لغو سفارش
        </Button>
      </span>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='آیا از لغو سفارش اطمینان دارید؟'
        defaultMaxWidth='sm'
        actions={<FormActions submitText='لغو' submitColor='error' onCancel={handleClose} onSubmit={handleConfirm} isLoading={mutation.isPending} />}
      />
    </>
  )
}

export default CancelOrderDialog
