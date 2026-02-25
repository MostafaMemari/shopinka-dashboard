// MUI Imports
import Grid from '@mui/material/Grid2'

import { getUserById } from '@/libs/api/user.api'
import { getOrders } from '@/libs/api/order.api'
import UserOrdersCard from '@/views/pages/users/details/UserOrdersCard'
import UserDetails from '@/views/pages/users/details/UserDetails'
import NotFound from '@/views/NotFound'
import UserTabs from '@/views/pages/users/details/UserTabs'
import UserCartCard from '@/views/pages/users/details/UserCartCard'
import { getCartByUserId } from '@/libs/api/cart.api'

interface Props {
  params: Promise<{ id: string }>
}

async function Page({ params }: Props) {
  const { id } = await params

  const user = await getUserById(id)

  const ordersResponse = await getOrders({ userId: id, includeTransaction: true, includeOrder: true, take: 50 })
  const cartResponse = await getCartByUserId(id)

  const orders = ordersResponse?.data
  const carts = cartResponse?.data

  if (!user.data) return <NotFound mode='light' />

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <UserDetails key={id} user={user.data} />
      </Grid>

      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <UserTabs
          tabs={[
            {
              label: 'سفارشات',
              content: <UserOrdersCard orders={orders} />
            },
            {
              label: 'سبد خرید',
              content: <UserCartCard carts={carts} />
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default Page
