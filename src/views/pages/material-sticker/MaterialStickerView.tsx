'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopMaterialStickerTable from './DesktopMaterialStickerTable'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyMaterialStickerState from './EmptyMaterialStickerState'
import { TableListSkeleton } from '@/components/TableSkeleton'
import CreateUpdateMaterialStickerDialog from './CreateUpdateMaterialStickerDialog'
import { useMaterialStickers } from '@/hooks/reactQuery/material-sticker/useMaterialSticker'
import { useMaterialStickerFilters } from '@/hooks/reactQuery/material-sticker/useMaterialStickerFilters'
import { useDebounce } from '@/hooks/useDebounce'
import { MaterialSticker } from '@/types/app/material-sticker.type'

const MaterialStickerView = () => {
  const { filters, queryParams } = useMaterialStickerFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])
  const { data, isLoading, isFetching, error, refetch } = useMaterialStickers({ params: { ...queryParams, name: queryParams.search } })

  const materialStickers: MaterialSticker[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateMaterialStickerDialog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت متریال جدید
            </Button>
          }
        />

        <CustomTextField id='form-props-search' placeholder='جستجوی متریال' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : materialStickers.length === 0 ? (
        <EmptyMaterialStickerState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopMaterialStickerTable data={materialStickers} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={materialStickers.length}
          />
        </>
      )}
    </Card>
  )
}

export default MaterialStickerView
