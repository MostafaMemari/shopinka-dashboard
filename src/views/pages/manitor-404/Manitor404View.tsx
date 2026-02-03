'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@mui/material/Card'
import { Box, CardHeader, Divider } from '@mui/material'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import ErrorState from '@/components/states/ErrorState'
import CustomTextField from '@/@core/components/mui/TextField'
import { TableListSkeleton } from '@/components/TableSkeleton'
import EmptyManitor404State from './EmptyManitor404State'
import DesktopManitor404Table from './DesktopManitor404Table'
import { useManitor404 } from '@/hooks/reactQuery/manitor-404/useManitor404'
import { useManitor404Filters } from '@/hooks/reactQuery/manitor-404/useManitor404Filters'
import { Manitor404Item } from '@/types/app/manitor-404.type'

const Manitor404ListView = () => {
  const { filters, queryParams } = useManitor404Filters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useManitor404({ params: { ...queryParams, title: queryParams.search } })
  const manitor404: Manitor404Item[] = useMemo(() => data?.data?.items || [], [data])
  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 4, p: 6 }}>
        <CustomTextField id='form-props-search' placeholder='جستجو...' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </Box>
      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={() => refetch()} />
      ) : manitor404.length === 0 ? (
        <EmptyManitor404State isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopManitor404Table data={manitor404} />

          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={manitor404.length}
          />
        </>
      )}
    </Card>
  )
}

export default Manitor404ListView
