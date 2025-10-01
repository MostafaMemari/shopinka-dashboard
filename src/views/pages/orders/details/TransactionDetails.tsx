// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

// Type Imports
import { TRANSACTION_STATUS_MAP, type Transaction } from '@/types/app/transaction.type'

const TransactionDetails = ({ transactionData }: { transactionData: Transaction }) => {
  const transactionStatus = transactionData?.status
    ? TRANSACTION_STATUS_MAP[transactionData.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
    : TRANSACTION_STATUS_MAP.UNKNOWN

  return (
    <Card>
      <CardContent className='flex flex-col gap-6'>
        <Typography variant='h5'>جزئیات تراکنش</Typography>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شناسه تراکنش:</Typography>
            <Typography color='text.primary'>#{transactionData.id}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شناسه کاربر:</Typography>
            <Typography color='text.primary'>#{transactionData.userId}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شناسه سفارش:</Typography>
            <Typography color='text.primary'>#{transactionData.orderId}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>مبلغ:</Typography>
            <Typography color='text.primary'>{transactionData.amount.toLocaleString()} تومان</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شماره فاکتور:</Typography>
            <Typography color='text.primary'>{transactionData.invoiceNumber}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>وضعیت:</Typography>
            <Chip label={transactionStatus.label} color={transactionStatus.color} size='small' />
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>کد پرداخت:</Typography>
            <Typography color='text.primary' fontSize='small'>
              {transactionData.authority}
            </Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>شناسه جلسه:</Typography>
            <Typography color='text.primary'>{transactionData.sessionId}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>تاریخ ایجاد:</Typography>
            <Typography color='text.primary'>{new Date(transactionData.createdAt).toLocaleDateString('fa-IR')}</Typography>
          </div>
          <div className='flex justify-between'>
            <Typography color='text.secondary'>تاریخ بروزرسانی:</Typography>
            <Typography color='text.primary'>{new Date(transactionData.updatedAt).toLocaleDateString('fa-IR')}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionDetails
