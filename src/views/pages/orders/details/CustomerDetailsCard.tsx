// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

// Util Imports
import { User } from '@/types/app/user.type'
import { getPersianInitials } from '@/utils/getInitials'

const CustomerDetails = ({ customerData }: { customerData?: User }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='h5'>جزئیات مشتری</Typography>
        <div className='flex items-center gap-3'>
          <Avatar>{getPersianInitials(customerData?.fullName || 'کاربر گرامی')}</Avatar>
          <div className='flex flex-col'>
            <Typography color='text.primary' className='font-medium'>
              {customerData?.fullName}
            </Typography>
            <Typography>شناسه مشتری: #{customerData?.id}</Typography>
          </div>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <Typography color='text.primary' className='font-medium'>
              اطلاعات تماس
            </Typography>
          </div>
          <Typography>موبایل: {customerData?.mobile}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomerDetails
