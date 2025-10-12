'use client'

import { useEffect, useMemo } from 'react'
import Card from '@mui/material/Card'
import { Box, Button } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import DesktopBannerTable from './DesktopBannerTable'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import EmptyBannerState from './EmptyBannerState'
import { Banner } from '@/types/app/banner.type'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { usePaginationQuery } from '@/hooks/usePaginationQuery'
import { useSearchQuery } from '@/hooks/useSearchQuery'
import { useBanners } from '@/hooks/reactQuery/banner/useBanner'
import CreateUpdateBannerDialog from './CreateUpdateBannerDialog'

const BannerListView = () => {
  const { page, limit, handlePageChange, handleRowsPerPageChange } = usePaginationQuery()
  const { search, inputValue, setInputValue } = useSearchQuery(500)

  useEffect(() => {
    handlePageChange(1)
  }, [search, handlePageChange])

  const { data, isLoading, isFetching, error, refetch } = useBanners({
    enabled: true,
    params: { page, take: limit, includeImage: true, name: search || undefined },
    staleTime: 5 * 60 * 1000
  })

  const banners: Banner[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CreateUpdateBannerDialog
          trigger={
            <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
              ثبت بنر جدید
            </Button>
          }
        />

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
            paginationData={paginationData}
            rowsPerPage={limit}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            currentPageItemCount={banners.length}
          />
        </>
      )}
    </Card>
  )
}

export default BannerListView
