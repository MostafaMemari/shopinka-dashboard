'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button, CardHeader, Divider, useMediaQuery, useTheme } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopProductTable from './DesktopProductTable'
import { Product } from '@/types/app/product.type'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import EmptyProductState from './EmptyProductState'
import { useRouter } from 'next/navigation'
import CustomTextField from '@/@core/components/mui/TextField'
import TableFilters from './TableFilters'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useProducts } from '@/hooks/reactQuery/product/useProduct'

const ProductListView = () => {
  const router = useRouter()
  const [tableData, setTableData] = useState<Product[]>([])

  const filters = useQuerySetState({
    search: parseAsString.withDefault(''),
    type: parseAsString.withDefault(''),
    categoryIds: parseAsArrayOf(parseAsInteger).withDefault([]),
    tagIds: parseAsArrayOf(parseAsInteger).withDefault([]),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10)
  })

  const [inputValue, setInputValue] = useState(filters.state.search || '')

  const debouncedInputValue = useDebounce(inputValue, 500)

  const queryParams = useMemo(
    () => ({
      name: filters.state.search || undefined,
      type: filters.state.type || undefined,
      categoryIds: filters.state.categoryIds.length ? filters.state.categoryIds : undefined,
      tagIds: filters.state.tagIds.length ? filters.state.tagIds : undefined,
      page: filters.state.page,
      take: filters.state.take
    }),
    [filters.state]
  )

  const { data, isLoading, isFetching, error, refetch } = useProducts({ params: { ...queryParams } })

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) {
      filters.setState({ search: debouncedInputValue, page: 1 })
    }
  }, [debouncedInputValue, filters])

  useEffect(() => {
    setTableData(data?.data.items || [])
  }, [data?.data.items])

  const products: Product[] = useMemo(() => tableData, [tableData])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  const handleAddProduct = () => router.push('/products/add')
  const handlePageChange = (page: number) => filters.setState({ page })
  const handlePerPageChange = (take: number) => filters.setState({ take, page: 1 })

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <CardHeader title='فیلتر ها' />
      <TableFilters filters={filters} />
      <Divider />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Button onClick={handleAddProduct} variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
          ثبت محصول جدید
        </Button>

        <CustomTextField id='form-props-search' placeholder='جستجوی محصول' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : products.length === 0 ? (
        <EmptyProductState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopProductTable products={products} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handlePerPageChange}
            currentPageItemCount={products.length}
          />
        </>
      )}
    </Card>
  )
}

export default ProductListView
