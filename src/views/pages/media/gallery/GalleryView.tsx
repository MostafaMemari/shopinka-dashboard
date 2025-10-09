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

const GalleryListView = () => {
  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number, scroll: true })
  const [size, setSize] = useQueryState('limit', { defaultValue: 10, parse: Number, scroll: true })
  const [search, setSearch] = useQueryState('search', { defaultValue: '', parse: String, scroll: true })

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useEffect(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useGallery({
    enabled: true,
    params: { page, take: size, name: search ?? undefined },
    staleTime: 5 * 60 * 1000
  })

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
        <EmptyGalleryState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopGalleryTable data={galleries} />

          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={galleries.length}
          />
        </>
      )}
    </Card>
  )
}

export default GalleryListView
