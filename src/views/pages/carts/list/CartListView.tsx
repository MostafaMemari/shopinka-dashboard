'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'
import DesktopCartTable from './DesktopCartsTable'
import { useCarts } from '@/hooks/reactQuery/cart/useCart'
import { useCartFilters } from '@/hooks/reactQuery/cart/useCartFilters'
import EmptyCartState from './EmptyCartState'
import { Cart } from '@/types/app/cart.type'

function CartListView() {
  const { filters, queryParams } = useCartFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useCarts({
    params: { ...queryParams }
  })

  const carts: Cart[] = useMemo(() => data?.data?.items || [], [data])
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
      ) : carts.length === 0 ? (
        <EmptyCartState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopCartTable carts={carts} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={carts.length}
          />
        </>
      )}
    </Card>
  )
}

export default CartListView
