'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopCategoryTable from './DesktopCategoryTable'
import { Category } from '@/types/app/category.type'
import ErrorState from '@/components/states/ErrorState'
import { useDebounce } from '@/hooks/useDebounce'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyCategoryState from './EmptyCategoryState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useCategoryFilters } from '@/hooks/reactQuery/category/useCategoryFilters'
import { useRouter } from 'next/navigation'
import { useCategories } from '@/hooks/reactQuery/category/useCategory'

const CategoryListView = () => {
  const router = useRouter()

  const { filters, queryParams } = useCategoryFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useCategories({
    params: { ...queryParams, name: queryParams.search, includeOnlyTopLevel: queryParams.search ? false : true, includeThumbnailImage: true, includeChildren: true }
  })

  const categories: Category[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  console.log(categories)

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={() => router.push('/categories/create')} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت تگ جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجوی دسته‌بندی' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : categories.length === 0 ? (
        <EmptyCategoryState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopCategoryTable categories={categories} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={categories.length}
          />
        </>
      )}
    </Card>
  )
}

export default CategoryListView
