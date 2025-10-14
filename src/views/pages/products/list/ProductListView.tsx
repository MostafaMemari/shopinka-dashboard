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
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useProducts } from '@/hooks/reactQuery/product/useProduct'
import { useProductFilters } from '@/hooks/reactQuery/product/useProductFilters'

const ProductListView = () => {
  const router = useRouter()

  const { filters, queryParams } = useProductFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useProducts({ params: { ...queryParams } })

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) {
      filters.setState({ search: debouncedInputValue, page: 1 })
    }
  }, [debouncedInputValue, filters])

  const products: Product[] = useMemo(() => data?.data?.items || [], [data])
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
