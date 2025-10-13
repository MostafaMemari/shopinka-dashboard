'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopShippingTable from './DesktopShippingTable'
import { Shipping } from '@/types/app/shipping.type'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyShippingState from './EmptyShippingState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import CreateUpdateShippingDialog from './CreateUpdateShippingDialog'
import { useShippings } from '@/hooks/reactQuery/shipping/useShipping'
import { useShippingFilters } from '@/hooks/reactQuery/shipping/useShippingFilters'
import { useDebounce } from '@/hooks/useDebounce'

const ShippingView = () => {
  const { filters, queryParams } = useShippingFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])
  const { data, isLoading, isFetching, error, refetch } = useShippings({ params: { ...queryParams, name: queryParams.search } })

  const shippings: Shipping[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateShippingDialog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت حمل و نقل جدید
            </Button>
          }
        />

        <CustomTextField id='form-props-search' placeholder='جستجوی حمل و نقل' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : shippings.length === 0 ? (
        <EmptyShippingState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopShippingTable data={shippings} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={shippings.length}
          />
        </>
      )}
    </Card>
  )
}

export default ShippingView
