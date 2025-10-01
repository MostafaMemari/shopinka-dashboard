import { Stack, Typography } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const OrderDateTime = ({ createdAt }: { createdAt?: string }) => {
  if (!createdAt) return null

  const date = new Date(createdAt)

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Typography variant='body2'>{date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</Typography>
        <AccessTimeIcon fontSize='small' color='action' />
      </Stack>
      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Typography variant='body2'>{date.toLocaleDateString('fa-IR')}</Typography>
        <CalendarTodayIcon fontSize='small' color='action' />
      </Stack>
    </Stack>
  )
}

export default OrderDateTime
