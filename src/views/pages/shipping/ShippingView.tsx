'use client'

import { useEffect, useMemo } from 'react'
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
import { usePaginationQuery } from '@/hooks/usePaginationQuery'
import { useSearchQuery } from '@/hooks/useSearchQuery'

const ShippingView = () => {
  const { page, limit, handlePageChange, handleRowsPerPageChange } = usePaginationQuery()
  const { search, inputValue, setInputValue } = useSearchQuery(500)

  useEffect(() => {
    handlePageChange(1)
  }, [search, handlePageChange])

  const { data, isLoading, isFetching, error, refetch } = useShippings({
    enabled: true,
    params: { page, take: limit, name: search || undefined }
  })

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
        <EmptyShippingState isSearch={!!search} searchQuery={inputValue} />
      ) : (
        <>
          <DesktopShippingTable data={shippings} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            currentPageItemCount={shippings.length}
          />
        </>
      )}
    </Card>
  )
}

export default ShippingView
