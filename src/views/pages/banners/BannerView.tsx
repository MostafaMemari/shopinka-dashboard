'use client'

import { useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopBannerTable from './DesktopBannerTable'
import { usePaginationParams } from '@/hooks/usePaginationParams'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import { useSearch } from '@/hooks/useSearchQuery'
import CustomTextField from '@/@core/components/mui/TextField'
import { useBanners } from '@/hooks/reactQuery/useBanner'
import EmptyBannerState from './EmptyBannerState'
import CreateBannerModal from './CreateBannerModal'
import { Banner } from '@/types/app/banner.type'
import { TableListSkeleton } from '@/components/TableSkeleton'

const BannerListView = () => {
  const { page, size, setPage, setSize } = usePaginationParams()
  const { search, setSearch } = useSearch()

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useMemo(() => {
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch])

  const { data, isLoading, isFetching, error, refetch } = useBanners({
    enabled: true,
    params: {
      page,
      take: size,
      includeImage: true,
      name: search ?? undefined
    },
    staleTime: 5 * 60 * 1000
  })

  const banners: Banner[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateBannerModal>
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت بنر جدید
          </Button>
        </CreateBannerModal>

        <CustomTextField id='form-props-search' placeholder='جستجوی بنر' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : banners.length === 0 ? (
        <EmptyBannerState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopBannerTable banners={banners} />
          <TablePaginationComponent
            currentPage={page}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={banners.length}
          />
        </>
      )}
    </Card>
  )
}

export default BannerListView
