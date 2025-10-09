'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopShippingTable from './DesktopShippingTable'
import { Shipping } from '@/types/app/shipping.type'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyShippingState from './EmptyShippingState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'
import CreateUpdateShippingDialog from './CreateUpdateShippingDialog'
import { useShippings } from '@/hooks/reactQuery/shipping/useShipping'

const ShippingView = () => {
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

  const { data, isLoading, isFetching, error, refetch } = useShippings({
    enabled: true,
    params: { page, take: size }
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
        <EmptyShippingState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopShippingTable data={shippings} />

          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={shippings.length}
          />
        </>
      )}
    </Card>
  )
}

export default ShippingView
