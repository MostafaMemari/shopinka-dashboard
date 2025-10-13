'use client'

import { useMemo, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import DesktopOrderTable from './DesktopOrderTable'
import EmptyOrderState from './EmptyOrderState'
import { Order } from '@/types/app/order.type'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useOrders } from '@/hooks/reactQuery/useOrder'
import { useDebounce } from '@/hooks/useDebounce'
import { useOrderFilters } from '@/hooks/reactQuery/order/useOrderFilters'

const OrderListView = () => {
  const { filters, queryParams } = useOrderFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useOrders({ params: { ...queryParams, orderNumber: queryParams.search } })
  const orders: Order[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <div />

        <CustomTextField id='form-props-search' placeholder='جستجوی سفارشات' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : orders.length === 0 ? (
        <EmptyOrderState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopOrderTable orders={orders} refetch={refetch} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={orders.length}
          />
        </>
      )}
    </Card>
  )
}

export default OrderListView
