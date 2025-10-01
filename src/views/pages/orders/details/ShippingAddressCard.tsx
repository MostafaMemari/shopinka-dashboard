// MUI Imports
import { AddressSnapshot } from '@/types/app/address.type'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

const ShippingAddress = ({ addressSnapshot }: { addressSnapshot: AddressSnapshot }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Typography variant='h5'>آدرس ارسال</Typography>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>نام گیرنده:</Typography>
            <Typography color='text.primary'>{addressSnapshot.fullName}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>آدرس:</Typography>
            <Typography color='text.primary'>{addressSnapshot.postalAddress}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شماره ساختمان / واحد:</Typography>
            <Typography color='text.primary'>
              {addressSnapshot.buildingNumber}/{addressSnapshot.unit}
            </Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شهر:</Typography>
            <Typography color='text.primary'>{addressSnapshot.city}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>استان:</Typography>
            <Typography color='text.primary'>{addressSnapshot.province}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>کد پستی:</Typography>
            <Typography color='text.primary'>{addressSnapshot.postalCode}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingAddress
