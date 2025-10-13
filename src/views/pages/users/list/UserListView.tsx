'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { useUsers } from '@/hooks/reactQuery/user/useUser'
import { TableListSkeleton } from '@/components/TableSkeleton'
import DesktopUserTable from './DesktopUsersTable'
import EmptyUserState from '../../users/list/EmptyUserState'
import { type User } from '@/types/app/user.type'
import { useUserFilters } from '@/hooks/reactQuery/user/useUserFilters'

function UserListView() {
  const { filters, queryParams } = useUserFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useUsers({
    params: { ...queryParams }
  })

  const users: User[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <div></div>

        <CustomTextField id='form-props-search' placeholder='جستجوی محصول' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : users.length === 0 ? (
        <EmptyUserState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopUserTable users={users} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={users.length}
          />
        </>
      )}
    </Card>
  )
}

export default UserListView
