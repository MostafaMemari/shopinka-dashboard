'use client'

import React from 'react'
import { Button } from '@mui/material'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'

function CompleteOrderDialog({ orderId }: { orderId: number }) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleConfirm = () => {
    handleClose()
    console.log('object')
  }

  return (
    <>
      <span onClick={handleOpen} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <Button variant='contained' color='success'>
          تکمیل سفارش
        </Button>
      </span>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='آیا از تکمیل سفارش اطمینان دارید؟'
        defaultMaxWidth='sm'
        actions={<FormActions submitText='تکمیل' submitColor='primary' onCancel={handleClose} onSubmit={handleConfirm} />}
      />
    </>
  )
}

export default CompleteOrderDialog
