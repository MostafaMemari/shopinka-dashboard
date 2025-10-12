'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { Attribute } from '@/types/app/productAttributes.type'
import DesktopAttributeTable from './DesktopAttributeTable'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import ErrorState from '@/components/states/ErrorState'
import EmptyAttributeState from './EmptyAttributeState'
import { useDebounce } from '@/hooks/useDebounce'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useAttribute } from '@/hooks/reactQuery/attribute/useAttribute'
import CreateUpdateAttributeDialog from './CreateUpdateAttributeDialog'

const ProductAttributeView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()

  const [inputValue, setInputValue] = useState(search)
  const debouncedInputValue = useDebounce(inputValue, 500)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useAttribute({
    enabled: true,
    params: { page, take: size, includeThumbnailImage: true, includeChildren: true, childrenDepth: 6 },
    staleTime: 5 * 60 * 1000
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
        <EmptyAttributeState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopAttributeTable data={attributes} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={attributes.length}
          />
        </>
      )}
    </Card>
  )
}

export default ProductAttributeView
