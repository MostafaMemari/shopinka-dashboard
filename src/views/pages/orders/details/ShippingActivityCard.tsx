'use client'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiTimeline from '@mui/lab/Timeline'
import type { TimelineProps } from '@mui/lab/Timeline'

import { TRANSACTION_STATUS_MAP } from '@/types/app/transaction.type'
import { ORDER_STATUS_MAP, OrderDetails } from '@/types/app/order.type'

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    },
    '& .MuiTimelineContent-root:last-child': {
      paddingBottom: 0
    },
    '&:nth-last-child(2) .MuiTimelineConnector-root': {
      backgroundColor: 'transparent',
      borderInlineStart: '1px dashed var(--mui-palette-divider)'
    },
    '& .MuiTimelineConnector-root': {
      backgroundColor: 'var(--mui-palette-primary-main)'
    }
  }
})

const ShippingActivity = ({ order }: { order: OrderDetails }) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('fa-IR')
  const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })

  const orderStatus = order.status ? ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || ORDER_STATUS_MAP.UNKNOWN : ORDER_STATUS_MAP.UNKNOWN

  const transaction = order.transaction
  const shipping = order.shipping
  const shippingInfo = order.shippingInfo

  const transactionStatus = transaction?.status
    ? TRANSACTION_STATUS_MAP[transaction.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
    : TRANSACTION_STATUS_MAP.UNKNOWN

  console.log(order)

  return (
    <Card>
      <CardHeader title='فعالیت‌های ارسال' />
      <CardContent>
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={orderStatus.color} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  سفارش ثبت شد (شماره سفارش: {order.orderNumber})
                </Typography>
                <Typography variant='caption'>
                  {formatDate(order.createdAt)} {formatTime(order.createdAt)}
                </Typography>
              </div>
              <Typography className='mbe-2'>
                {orderStatus.label === 'تحویل شده' ? 'سفارش با موفقیت تحویل داده شد' : orderStatus.label === 'لغو شده' ? 'سفارش لغو شد' : 'سفارش در حال پردازش است'}
              </Typography>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={transactionStatus.color} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className='font-medium'>
                  پرداخت {transactionStatus.label}
                </Typography>
                <Typography variant='caption'>
                  {formatDate(transaction.createdAt)} {formatTime(transaction.createdAt)}
                </Typography>
              </div>
              <Typography className='mbe-2'>
                {transaction.status === 'SUCCESS'
                  ? 'پرداخت تراکنش با موفقیت انجام شد'
                  : transaction.status === 'FAILED'
                    ? 'پرداخت تراکنش ناموفق بود'
                    : transaction.status === 'PENDING'
                      ? 'پرداخت تراکنش در انتظار است'
                      : transaction.status === 'REFUNDED'
                        ? 'پرداخت تراکنش برگشت داده شد'
                        : 'وضعیت پرداخت تراکنش نامشخص است'}
              </Typography>{' '}
            </TimelineContent>
          </TimelineItem>

          {shippingInfo && (
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='success' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                  <Typography color='text.primary' className='font-medium'>
                    روش ارسال: {shipping?.name} ({shipping?.estimatedDays} روز کاری)
                  </Typography>
                  <Typography variant='caption'>
                    {formatDate(order.createdAt)} {formatTime(order.createdAt)}
                  </Typography>
                </div>

                <Typography className={`mbe-2`}>
                  {order.shippingInfo
                    ? order.shippingInfo.sentAt
                      ? `سفارش ارسال شد (کد پیگیری: ${order.shippingInfo.trackingCode})`
                      : `سفارش در حال آماده‌سازی برای ارسال است`
                    : 'اطلاعات ارسال موجود نیست'}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          )}

          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color={orderStatus.color} />
            </TimelineSeparator>
            <TimelineContent>
              <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
                <Typography color='text.primary' className={`font-medium ${order.status === 'DELIVERED' ? 'text-success' : order.status === 'CANCELLED' ? 'text-error' : ''}`}>
                  {order.status === 'DELIVERED' ? 'سفارش تحویل داده شد' : order.status === 'CANCELLED' ? 'سفارش لغو شد' : 'در انتظار تحویل'}
                </Typography>

                <Typography variant='caption'>
                  {order.status === 'PROCESSING' && shippingInfo?.sentAt
                    ? `${formatDate(shippingInfo.sentAt)} ${formatTime(shippingInfo.sentAt)}`
                    : `${formatDate(order.createdAt)} ${formatTime(order.createdAt)}`}
                </Typography>
              </div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}

export default ShippingActivity
