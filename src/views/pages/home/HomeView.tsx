import React from 'react'
import Grid from '@mui/material/Grid2'
import LogisticsStatisticsCard from './LogisticsStatisticsCard'
import OrderListTableHome from './OrderListTableHome'
import { getOrders } from '@/libs/api/order.api'
import { getCustomStickers } from '@/libs/api/custom-sticker.api'
import ContactListTableHome from './ContactListTableHome'
import { getContacts } from '@/libs/api/contact.api'
import StickerListTable from './StickerListTable'

const data = [
  {
    title: 'تعداد کاربران',
    stats: `42`,
    trendNumber: 18.2,
    avatarIcon: 'tabler-users-group',
    color: 'primary'
  },
  {
    title: 'محصول منتشر شده',
    stats: 8,
    trendNumber: -8.7,
    avatarIcon: 'tabler-package',
    color: 'warning'
  },
  {
    title: 'مقاله منتشر شده',
    stats: 27,
    trendNumber: 4.3,
    avatarIcon: 'tabler-file-text',
    color: 'error'
  },
  {
    title: 'سفارشات',
    stats: 13,
    trendNumber: 2.5,
    avatarIcon: 'tabler-shopping-cart',
    color: 'info'
  }
]

async function HomeView() {
  const orders = await getOrders({})
  const customStickers = await getCustomStickers({})
  const contacts = await getContacts({})

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <LogisticsStatisticsCard data={data} />
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <ContactListTableHome contactData={contacts.data} />
      </Grid>

      <Grid size={{ xs: 12, lg: 6 }}>
        <OrderListTableHome orderData={orders.data} />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <StickerListTable stickerData={customStickers.data} />
      </Grid>
    </Grid>
  )
}

export default HomeView
