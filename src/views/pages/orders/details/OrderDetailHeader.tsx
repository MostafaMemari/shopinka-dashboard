// MUI Imports
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'

// Component Imports
import { ORDER_STATUS_MAP, OrderDetails } from '@/types/app/order.type'
import { TRANSACTION_STATUS_MAP } from '@/types/app/transaction.type'

import CompleteOrderDialog from './CompleteOrderDialog'

const OrderDetailHeader = ({ order }: { order: OrderDetails }) => {
  const transactionStatus = order.transaction?.status
    ? TRANSACTION_STATUS_MAP[order.transaction.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
    : TRANSACTION_STATUS_MAP.UNKNOWN

  const orderStatus = order.status ? ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || ORDER_STATUS_MAP.UNKNOWN : ORDER_STATUS_MAP.UNKNOWN

  return (
    <div className='flex flex-wrap justify-between sm:items-center max-sm:flex-col gap-y-4'>
      <div className='flex flex-col items-start gap-1'>
        <div className='flex items-center gap-2'>
          <Typography variant='h5'>{`#${order.orderNumber}`}</Typography>
          <Chip variant='tonal' label={`پرداخت ${transactionStatus.label}`} color={transactionStatus.color} size='small' />
          <Chip variant='tonal' label={orderStatus.label} color={orderStatus.color} size='small' />
        </div>
      </div>

      <CompleteOrderDialog orderId={order.id} />
    </div>
  )
}

export default OrderDetailHeader
