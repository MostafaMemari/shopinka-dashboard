// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'

// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'
import { User } from '@/types/app/user.type'

const UserDetails = ({ user }: { user: User }) => {
  return (
    <>
      <Card>
        <CardContent className='flex flex-col pbs-12 gap-6'>
          <div className='flex flex-col gap-6'>
            <div className='flex items-center justify-center flex-col gap-4'>
              <div className='flex flex-col items-center gap-4'>
                <CustomAvatar alt='user-profile' src='/images/avatars/1.png' variant='rounded' size={120} />
                <Typography variant='h5'>{`${user.fullName ?? 'کاربر گرامی'}`}</Typography>
              </div>
              <Chip label={user.role === 'CUSTOMER' ? 'مشتری' : user.role} color='secondary' size='small' variant='tonal' />
            </div>
          </div>
          <div>
            <Typography variant='h5'>اطلاعات کاربر</Typography>
            <Divider className='mlb-4' />
            <div className='flex flex-col gap-2'>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  شماره موبایل :
                </Typography>
                <Typography>{user.mobile}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  موبایل قبلی :
                </Typography>
                <Typography>{user.perviousMobile ?? 'نامشخص'}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  آخرین تغییر موبایل :
                </Typography>
                <Typography>{user.lastMobileChange ?? 'نامشخص'}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  وضعیت موبایل:
                </Typography>{' '}
                <Chip label={user.isVerifiedMobile ? 'تایید شده' : 'تایید نشده'} color={user.isVerifiedMobile ? 'success' : 'error'} size='small' />
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  نقش :
                </Typography>
                <Typography>{user.role}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  تاریخ ثبت نام :
                </Typography>
                <Typography>{new Date(user.createdAt).toLocaleDateString('fa-IR')}</Typography>
              </div>
              <div className='flex items-center flex-wrap gap-x-1.5'>
                <Typography className='font-medium' color='text.primary'>
                  تاریخ به‌روزرسانی :
                </Typography>

                <Typography>{new Date(user.updatedAt).toLocaleDateString('fa-IR')}</Typography>
              </div>
            </div>
            <Button variant='contained' color='primary' href={`tel:${user.mobile}`} className='m-auto mt-6 w-full'>
              تماس با مشتری
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UserDetails
