import { getOrderById } from '@/libs/api/order.api'
import OrderDetails from '../../../../views/pages/orders/details'
import NotFound from '@/views/NotFound'

interface Props {
  params: Promise<{ id: string }>
}

async function Page({ params }: Props) {
  const { id } = await params

  const order = await getOrderById(id)

  if (!order.data) return <NotFound mode='dark' />

  return <OrderDetails key={id} order={order.data} />
}

export default Page
