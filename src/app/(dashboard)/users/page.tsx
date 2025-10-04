import SimplePagination from '@/components/SimplePagination'
import { getUsers } from '@/libs/api/user.api'
import DesktopUserTable from '@/views/pages/users/list/DesktopUsersTable'
import UserListView from '@/views/pages/users/list/UserListView'
import { Card } from '@mui/material'
import React from 'react'

type PageProps = {
  searchParams: Promise<{ [key: string]: string }>
}

async function Users({ searchParams }: PageProps) {
  const params = await searchParams

  if (params.page === undefined) params.page = '1'
  if (params.take === undefined) params.take = '10'

  const res = await getUsers(params)

  const { items, pager } = res.data

  return (
    // <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
    //   <DesktopUserTable users={items} />
    //   <SimplePagination pager={pager} />
    // </Card>

    <UserListView />
  )
}

export default Users
