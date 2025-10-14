'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopGalleryTable from './DesktopGalleryTable'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useGallery } from '@/hooks/reactQuery/gallery/useGallery'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyGalleryState from './EmptyGalleryState'
import { Gallery } from '@/types/app/gallery.type'
import CreateGalleryModal from './CreateGalleryModal'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useQueryState } from 'nuqs'
import { useGalleryFilters } from '@/hooks/reactQuery/gallery/useGalleryFilters'

const GalleryListView = () => {
  const { filters, queryParams } = useGalleryFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useGallery({ params: { ...queryParams, title: queryParams.search } })
  const galleries: Gallery[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateGalleryModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت گالری جدید
          </Button>
        </CreateGalleryModal>

        <CustomTextField id='form-props-search' placeholder='جستجوی گالری' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : galleries.length === 0 ? (
        <EmptyGalleryState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopGalleryTable data={galleries} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={galleries.length}
          />
        </>
      )}
    </Card>
  )
}

export default GalleryListView
