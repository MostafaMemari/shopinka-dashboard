'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopTagTable from './DesktopTagTable'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { Tag } from '@/types/app/tag.type'
import EmptyTagState from './EmptyTagState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useTags } from '@/hooks/reactQuery/tag/useTag'
import { useRouter } from 'next/navigation'
import { useTagFilters } from '@/hooks/reactQuery/tag/useTagFilters'

const TagListView = () => {
  const router = useRouter()

  const { filters, queryParams } = useTagFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useTags({
    params: { ...queryParams, name: debouncedInputValue ?? undefined }
  })

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={() => router.push('/tags/create')} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت تگ جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجوی تگ' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : tags.length === 0 ? (
        <EmptyTagState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopTagTable tags={tags} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={tags.length}
          />
        </>
      )}
    </Card>
  )
}

export default TagListView
