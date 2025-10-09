'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import DesktopCommentTable from './DesktopCommentTable'
import { useComments } from '@/hooks/reactQuery/useComment'
import { Comment } from '@/types/app/comment.type'
import EmptyCommentState from './EmptyCommentState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'

const CommentView = () => {
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

  const { data, isLoading, isFetching, error, refetch } = useComments({
    enabled: true,
    params: {
      page,
      take: size,
      includeUser: true,
      includeProduct: true
    },
    staleTime: 1 * 60 * 1000
  })

  const comments: Comment[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <div></div>

        <CustomTextField id='form-props-search' placeholder='جستجوی نظر' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : comments.length === 0 ? (
        <EmptyCommentState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopCommentTable comments={comments} />
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={comments.length}
          />
        </>
      )}
    </Card>
  )
}

export default CommentView
