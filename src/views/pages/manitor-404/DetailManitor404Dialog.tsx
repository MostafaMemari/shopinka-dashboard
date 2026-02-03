'use client'

import React from 'react'
import { Button, DialogContent, Typography, Box, IconButton } from '@mui/material'
import { Link, Public, Devices, CalendarToday, AccessTime, Numbers } from '@mui/icons-material'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { Manitor404Item } from '@/types/app/manitor-404.type'

const Manitor404DetailsDialog = ({ item }: { item: Manitor404Item }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const DetailRow = ({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap',
        padding: '8px 0',
        borderBottom: '1px solid #e8ecef',
        '&:last-child': { borderBottom: 'none' }
      }}
    >
      {icon}
      <Typography sx={{ fontWeight: 600, color: 'text.secondary', minWidth: '120px' }}>{label}:</Typography>
      <Typography sx={{ wordBreak: 'break-word', color: 'text.primary' }}>{value}</Typography>
    </Box>
  )

  return (
    <div>
      <IconButton onClick={handleOpen} size='small'>
        <i className='tabler-eye text-gray-500 text-lg' />
      </IconButton>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='جزئیات خطای 404'
        defaultMaxWidth='sm'
        actions={
          <Button onClick={handleClose} color='secondary' variant='outlined'>
            بستن
          </Button>
        }
      >
        <DialogContent sx={{ pb: 4 }}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              borderRadius: 2,
              padding: 3,
              border: '1px solid #e0e4e8',
              maxHeight: '70vh',
              overflowY: 'auto'
            }}
          >
            <DetailRow label='مسیر' value={item.path} icon={<Link color='primary' fontSize='small' />} />

            <DetailRow label='ارجاع‌دهنده' value={item.referrer || '—'} icon={<Public color='primary' fontSize='small' />} />

            <DetailRow label='User Agent' value={item.userAgent} icon={<Devices color='primary' fontSize='small' />} />

            <DetailRow label='تعداد بازدید' value={item.hitCount.toString()} icon={<Numbers color='primary' fontSize='small' />} />

            <DetailRow label='آخرین بازدید' value={new Date(item.lastSeenAt).toLocaleString('fa-IR')} icon={<AccessTime color='primary' fontSize='small' />} />

            <DetailRow label='تاریخ ایجاد' value={new Date(item.createdAt).toLocaleString('fa-IR')} icon={<CalendarToday color='primary' fontSize='small' />} />
          </Box>
        </DialogContent>
      </CustomDialog>
    </div>
  )
}

export default Manitor404DetailsDialog
