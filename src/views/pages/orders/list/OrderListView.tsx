'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import DesktopOrderTable from './DesktopOrderTable'
import { Order } from '@/types/app/order.type'
import EmptyOrderState from './EmptyOrderState'
import { useOrders } from '@/hooks/reactQuery/useOrder'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'

const OrderListView = () => {
  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number, scroll: true })
  const [size, setSize] = useQueryState('limit', { defaultValue: 10, parse: Number, scroll: true })
  const [search, setSearch] = useQueryState('search', { defaultValue: '', parse: String, scroll: true })

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useEffect(() => {
    setPage(1)
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch, setPage])

  const { data, isLoading, isFetching, error, refetch } = useOrders({
    enabled: true,
    params: {
      page,
      take: size,
      includeAddress: true,
      includeTransaction: true,
      includeShippingInfo: true,
      name: search ?? undefined
    },
    staleTime: 5 * 60 * 1000
  })

  const orders: Order[] = useMemo(() => data?.data?.items || [], [data])
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
      ) : orders.length === 0 ? (
        <EmptyOrderState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopOrderTable orders={orders} refetch={refetch} />
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={orders.length}
          />
        </>
      )}
    </Card>
  )
}

export default OrderListView
