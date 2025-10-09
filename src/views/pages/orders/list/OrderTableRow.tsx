import { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { Order, ORDER_STATUS_MAP } from '@/types/app/order.type'
import { changeStatusOrder } from '@/libs/api/order.api'
import OrderTableActions from './OrderTableActions'
import { ShippingInfo } from '@/types/app/shippingInfo.type'
import Link from 'next/link'
import classNames from 'classnames'
import { TRANSACTION_STATUS_MAP } from '@/types/app/transaction.type'

interface OrderTableRowProps {
  order: Order
  refetch: () => void
}

const OrderTableRow = ({ order, refetch }: OrderTableRowProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (id: number, status: 'CANCELLED' | 'DELIVERED') => {
    setIsLoading(true)

    try {
      const res = await changeStatusOrder(id, status)

      if (res.status === 200) refetch()
    } finally {
      setIsLoading(false)
    }
  }

  const transactionStatus = order.transaction?.status
    ? TRANSACTION_STATUS_MAP[order.transaction.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
    : TRANSACTION_STATUS_MAP.UNKNOWN

  const orderStatus = order.status ? ORDER_STATUS_MAP[order.status as keyof typeof ORDER_STATUS_MAP] || ORDER_STATUS_MAP.UNKNOWN : ORDER_STATUS_MAP.UNKNOWN

  return (
    <tr>
      <td className='text-sky-300 dark:text-sky-600'>
        <Link href={`/orders/${order.id}`}>{order.id}#</Link>
      </td>
      <td>
        <Link href={`/users/${order.userId}`} className='no-underline'>
          <Typography variant='body2' className='text-sky-300 dark:text-sky-600 font-semibold block'>
            {order.user?.fullName}
          </Typography>
        </Link>
        <Typography variant='caption' className='text-sky-300 dark:text-sky-600 block'>
          {order.user?.mobile}
        </Typography>
      </td>

      <td>
        <div className='flex items-center gap-1'>
          <i className={classNames('tabler-circle-filled bs-2.5 is-2.5', transactionStatus.colorClassName)} />
          <Typography className={classNames('font-medium', transactionStatus.colorClassName)}>{transactionStatus.label}</Typography>
        </div>
      </td>
      <td>
        <Chip label={orderStatus.label} color={orderStatus.color} size='small' />
      </td>
      <td>{order.transaction?.createdAt ? new Date(order.transaction.createdAt).toLocaleString('fa-ir') : '-'}</td>
      <td>{order.transaction?.amount ?? '-'}</td>
      <td>
        <OrderTableActions orderId={order.id} shippingInfo={order.shippingInfo as ShippingInfo} isLoading={isLoading} onStatusChange={handleStatusChange} />
      </td>
    </tr>
  )
}

export default OrderTableRow
