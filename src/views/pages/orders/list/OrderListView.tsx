'use client'

import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import DesktopOrderTable from './DesktopOrderTable'
import EmptyOrderState from './EmptyOrderState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useOrders } from '@/hooks/reactQuery/useOrder'
import { useOrderFilters } from '@/hooks/reactQuery/order/useOrderFilters'

const OrderListView = () => {
  const { queryParams, state, actions } = useOrderFilters()

  const { data, isLoading, isFetching, error, refetch } = useOrders({ params: queryParams })
  const orders = data?.data?.items || []
  const paginationData = data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <div />
        <CustomTextField id='form-props-search' placeholder='جستجوی سفارشات' type='search' value={state.searchInput} onChange={e => actions.setSearchInput(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : orders.length === 0 ? (
        <EmptyOrderState isSearch={!!state.search} searchQuery={state.search} />
      ) : (
        <>
          <DesktopOrderTable orders={orders} refetch={refetch} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={state.take}
            onPageChange={actions.setPage}
            onRowsPerPageChange={actions.setPerPage}
            currentPageItemCount={orders.length}
          />
        </>
      )}
    </Card>
  )
}

export default OrderListView
