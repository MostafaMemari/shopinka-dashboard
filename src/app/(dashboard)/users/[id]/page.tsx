// MUI Imports
import Grid from '@mui/material/Grid2'

import { getUserById } from '@/libs/api/user.api'
import { getOrders } from '@/libs/api/order.api'
import UserOrdersCard from '@/views/pages/users/details/UserOrdersCard'
import UserDetails from '@/views/pages/users/details/UserDetails'

interface Props {
  params: Promise<{ id: string }>
}

async function Page({ params }: Props) {
  const { id } = await params

  const user = await getUserById(id)

  const orders = (await getOrders({ userId: id, includeTransaction: true, take: 50 })).data.items

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, lg: 4, md: 5 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <UserDetails key={id} user={user.data} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, lg: 8, md: 7 }}>
        <UserOrdersCard orders={orders} />
      </Grid>
    </Grid>
  )
}

export default Page
