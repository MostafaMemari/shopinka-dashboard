'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { Font } from '@/types/app/font.type'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'

import { useDebounce } from '@/hooks/useDebounce'
import CreateUpdateFontDialog from './CreateUpdateFontDialog'
import EmptyFontState from './EmptyFontState'
import DesktopFontTable from './DesktopFontTable'
import { useFontFilters } from '@/hooks/reactQuery/font/useFontFilters'
import { useFonts } from '@/hooks/reactQuery/font/useFont'

const FontView = () => {
  const { filters, queryParams } = useFontFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])
  const { data, isLoading, isFetching, error, refetch } = useFonts({ params: { ...queryParams, name: queryParams.search, includeFile: true, includeThumbnail: true } })

  const shippings: Font[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateFontDialog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت فونت جدید
            </Button>
          }
        />

        <CustomTextField id='form-props-search' placeholder='جستجوی فونت' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : shippings.length === 0 ? (
        <EmptyFontState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopFontTable data={shippings} />

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

export default FontView
