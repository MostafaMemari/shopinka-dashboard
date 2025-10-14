'use client'

import { useState, useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopMediaGallery from './DesktopMediaGallery'
import CreateMediaModal from './UploadMediaDoalog'
import RemoveGalleryItemModal from './RemoveMediaModal'
import { useGalleryItems } from '@/hooks/reactQuery/gallery/useGallery'
import { GalleryItem } from '@/types/app/gallery.type'
import ErrorState from '@/components/states/ErrorState'
import EmptyGalleryItemsState from './EmptyGalleryItemsState'
import CustomTextField from '@/@core/components/mui/TextField'
import { GalleryItemSkeleton } from '@/components/TableSkeleton'
import { useDebounce } from '@/hooks/useDebounce'
import { useGalleryItemFilters } from '@/hooks/reactQuery/gallery/useGalleryItemFilters'

const GalleryItemView = ({ galleryId }: { galleryId: string }) => {
  const [selected, setSelected] = useState<string[]>([])

  const { filters, queryParams } = useGalleryItemFilters()

  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useGalleryItems({
    params: { ...queryParams, galleryId },
    enabled: !!galleryId
  })

  const galleryItems: GalleryItem[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  useEffect(() => {
    const validIds = galleryItems.map(item => item.id)

    setSelected(prev => {
      const newSelected = prev.filter(id => validIds.includes(Number(id)))

      return newSelected.length === prev.length ? prev : newSelected
    })
  }, [galleryItems])

  const handleCheckboxChange = (id: string) => {
    setSelected(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  const handleClearSelection = () => {
    setSelected([])
  }

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CreateMediaModal
            galleryId={galleryId}
            trigger={
              <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
                آپلود فایل جدید
              </Button>
            }
          />
          {selected.length > 0 && <RemoveGalleryItemModal selectedImages={selected} onClearSelection={handleClearSelection} />}
        </Box>
        <CustomTextField id='form-props-search' placeholder='جستجوی رسانه' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>

      {isLoading || isFetching ? (
        <GalleryItemSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : galleryItems.length === 0 ? (
        <EmptyGalleryItemsState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopMediaGallery data={galleryItems} selected={selected} handleCheckboxChange={handleCheckboxChange} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={galleryItems.length}
          />
        </>
      )}
    </Card>
  )
}

export default GalleryItemView
