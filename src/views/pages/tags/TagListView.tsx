'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopTagTable from './DesktopTagTable'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import { Tag } from '@/types/app/tag.type'
import EmptyTagState from './EmptyTagState'
import CreateTagModal from './CreateAndUpdate/CreateTagDialog'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'
import { useTags } from '@/hooks/reactQuery/tag/useTag'
import { useRouter } from 'next/navigation'

const TagListView = () => {
  const router = useRouter()

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

  const { data, isLoading, isFetching, error, refetch } = useTags({
    enabled: true,
    params: { page, take: size, name: search ?? undefined, includeThumbnailImage: true },
    staleTime: 5 * 60 * 1000
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
        <EmptyTagState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopTagTable tags={tags} />
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={tags.length}
          />
        </>
      )}
    </Card>
  )
}

export default TagListView
