import { getOrderById } from '@/libs/api/order.api'
import OrderDetails from '../../../../views/pages/orders/details'

interface Props {
  params: Promise<{ id: string }>
}

async function Page({ params }: Props) {
  const { id } = await params

  const order = await getOrderById(id)

  return <OrderDetails key={id} order={order.data} />
}

export default Page
