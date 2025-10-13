'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { usePages } from '@/hooks/reactQuery/page/usePage'
import { Page } from '@/types/app/page.type'
import EmptyPageState from './EmptyPageState'
import DesktopPageTable from './DesktopPageTable'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useRouter } from 'next/navigation'
import { usePageFilters } from '@/hooks/reactQuery/page/usePageFilters'

const PageListView = () => {
  const { filters, queryParams } = usePageFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const router = useRouter()

  const { data, isLoading, isFetching, error, refetch } = usePages({
    enabled: true,
    params: { ...queryParams, name: queryParams.search },
    staleTime: 5 * 60 * 1000
  })

  const pages: Page[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={() => router.push('/pages/create')} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت برگه جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجو برگه' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : pages.length === 0 ? (
        <EmptyPageState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopPageTable pages={pages} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={pages.length}
          />
        </>
      )}
    </Card>
  )
}

export default PageListView
