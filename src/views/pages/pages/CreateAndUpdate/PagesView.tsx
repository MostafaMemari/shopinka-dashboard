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
import EmptyPageState from '../EmptyPageState'
import DesktopPageTable from '../DesktopPageTable'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'
import { useRouter } from 'next/navigation'

const PageListView = () => {
  const router = useRouter()

  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number, scroll: true })
  const [size, setSize] = useQueryState('limit', { defaultValue: 10, parse: Number, scroll: true })
  const [search, setSearch] = useQueryState('search', { defaultValue: '', parse: String, scroll: true })

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useEffect(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = usePages({
    enabled: true,
    params: { page, take: size, name: search ?? undefined },
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
        <EmptyPageState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopPageTable pages={pages} />
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={pages.length}
          />
        </>
      )}
    </Card>
  )
}

export default PageListView
