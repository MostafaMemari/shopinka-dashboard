'use client'

import { ReactNode } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import type { Breakpoint } from '@mui/material/styles'

interface CustomDialogConfirmProps {
  open: boolean
  setOpen: (open: boolean) => void
  title?: string
  children: ReactNode
  defaultMaxWidth?: Breakpoint
  actions?: ReactNode
  dialogStyles?: object
  fullScreen?: boolean
  width?: string
  height?: string
}

const CustomDialogConfirm = (props: CustomDialogConfirmProps) => {
  const { open, setOpen, title = 'Dialog', children, defaultMaxWidth = 'sm', actions, dialogStyles = {}, fullScreen = false, width, height } = props

  const customSize = !!width || !!height

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='custom-dialog-title'
      closeAfterTransition={false}
      fullScreen={fullScreen}
      fullWidth={!customSize}
      maxWidth={!customSize ? defaultMaxWidth : false}
      sx={dialogStyles}
      PaperProps={{
        sx: {
          ...(customSize && {
            width: width || 'auto',
            height: height || 'auto'
          }),
          m: 'auto',
          borderRadius: 2
        }
      }}
    >
      {title && <DialogTitle id='custom-dialog-title'>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions className='dialog-actions-dense'>{actions || <Button onClick={() => setOpen(false)}>Close</Button>}</DialogActions>
    </Dialog>
  )
}

export default CustomDialogConfirm
