// MUI Imports
import Grid from '@mui/material/Grid2'

import { type OrderDetails } from '@/types/app/order.type'

// Component Imports
import OrderDetailHeader from './OrderDetailHeader'
import OrderDetailsCard from './OrderDetailsCard'
import CustomerDetails from './CustomerDetailsCard'
import ShippingAddress from './ShippingAddressCard'

const OrderDetails = ({ order }: { order: OrderDetails }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <OrderDetailHeader order={order} />
      </Grid>
      <Grid size={{ xs: 12, md: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <OrderDetailsCard order={order} />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <CustomerDetails customerData={order.user} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <ShippingAddress addressSnapshot={order.addressSnapshot} />
          </Grid>
          <Grid size={{ xs: 12 }}>{/* <BillingAddress /> */}</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrderDetails
