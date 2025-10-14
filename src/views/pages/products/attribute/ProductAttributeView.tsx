'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { Attribute } from '@/types/app/productAttributes.type'
import DesktopAttributeTable from './DesktopAttributeTable'
import ErrorState from '@/components/states/ErrorState'
import EmptyAttributeState from './EmptyAttributeState'
import { useDebounce } from '@/hooks/useDebounce'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useAttribute } from '@/hooks/reactQuery/attribute/useAttribute'
import CreateUpdateAttributeDialog from './CreateUpdateAttributeDialog'
import { useAttributeFilters } from '@/hooks/reactQuery/attribute/useAttributeFilters'

const ProductAttributeView = () => {
  const { filters, queryParams } = useAttributeFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useAttribute({
    params: { ...queryParams, includeThumbnailImage: true, includeChildren: true, childrenDepth: 6 }
  })

  const attributes: Attribute[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateAttributeDialog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت ویژگی جدید
            </Button>
          }
        />

        <CustomTextField id='form-props-search' placeholder='جستجوی ویژگی' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : attributes.length === 0 ? (
        <EmptyAttributeState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopAttributeTable data={attributes} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={attributes.length}
          />
        </>
      )}
    </Card>
  )
}

export default ProductAttributeView
