// MUI Imports
import { type Shipping } from '@/types/app/shipping.type'
import { Button } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import ShippingInfoModal from '../list/ShippingInfoModal'
import { ShippingInfo } from '@/types/app/shippingInfo.type'

const ShippingMethod = ({ orderId, shippingData, shippingInfo }: { orderId: number; shippingData: Shipping; shippingInfo?: ShippingInfo }) => {
  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <div className='flex justify-between items-center'>
          <Typography variant='h5'>روش ارسال</Typography>

          <ShippingInfoModal shippingInfo={shippingInfo} id={orderId}>
            <Button variant='outlined'>اطلاعات ارسال</Button>
          </ShippingInfoModal>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>نام:</Typography>
            <Typography color='text.primary'>{shippingData.name}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>قیمت:</Typography>
            <Typography color='text.primary'>{shippingData.price.toLocaleString()} تومان</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>زمان تخمینی:</Typography>
            <Typography color='text.primary'>{shippingData.estimatedDays} روز</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>وضعیت:</Typography>
            <Typography color={shippingData.isActive ? 'success.main' : 'error.main'}>{shippingData.isActive ? 'فعال' : 'غیرفعال'}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ShippingMethod
