'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopBlogTable from './DesktopBlogTable'
import { Blog } from '@/types/app/blog.type'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyBlogState from './EmptyBlogState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useOrderFilters } from '@/hooks/reactQuery/order/useOrderFilters'
import { useBlogs } from '@/hooks/reactQuery/blog/useBlog'

const BlogListView = () => {
  const { filters, queryParams } = useOrderFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const router = useRouter()
  const handleAddBlog = () => router.push('/blogs/add')

  const { data, isLoading, isFetching, error, refetch } = useBlogs({
    params: { ...queryParams }
  })

  const blogs: Blog[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={handleAddBlog} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت وبلاگ جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجوی وبلاگ' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : blogs.length === 0 ? (
        <EmptyBlogState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopBlogTable blogs={blogs} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={blogs.length}
          />
        </>
      )}
    </Card>
  )
}

export default BlogListView
