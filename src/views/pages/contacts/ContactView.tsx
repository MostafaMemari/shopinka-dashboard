'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, Box } from '@mui/material'
import CustomTextField from '@/@core/components/mui/TextField'
import ErrorState from '@/components/states/ErrorState'
import TablePaginationComponent from '@/components/TablePaginationComponent'
import { useDebounce } from '@/hooks/useDebounce'
import EmptyContactState from './EmptyContactState'
import DesktopContactTable from './DesktopContactTable'
import { Contact } from '@/types/app/contact.type'
import { useContacts } from '@/hooks/reactQuery/useContact'
import { TableListSkeleton } from '@/components/TableSkeleton'
import { useContactFilters } from '@/hooks/reactQuery/contact/useContactFilters'

const ContactView = () => {
  const { filters, queryParams } = useContactFilters()
  const [inputValue, setInputValue] = useState(filters.state.search || '')
  const debouncedInputValue = useDebounce(inputValue, 500)

  useEffect(() => {
    if (debouncedInputValue !== filters.state.search) filters.setState({ search: debouncedInputValue, page: 1 })
  }, [debouncedInputValue, filters])

  const { data, isLoading, isFetching, error, refetch } = useContacts({
    params: { ...queryParams }
  })

  const contacts: Contact[] = useMemo(() => data?.data?.items || [], [data])

  const paginationData = useMemo(() => data?.data?.pager || { currentPage: 1, totalPages: 1, totalCount: 0 }, [data])

  return (
    <Card sx={{ bgcolor: 'background.paper', borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 6 }}>
        <CustomTextField id='form-props-search' placeholder='جستجوی پیام تماس' type='search' value={inputValue} onChange={e => setInputValue(e.target.value)} sx={{ width: 300 }} />
      </Box>

      {isLoading || isFetching ? (
        <TableListSkeleton />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : contacts.length === 0 ? (
        <EmptyContactState isSearch={!!filters.state.search} searchQuery={filters.state.search} />
      ) : (
        <>
          <DesktopContactTable contacts={contacts} />
          <TablePaginationComponent
            paginationData={paginationData}
            rowsPerPage={filters.state.take}
            onPageChange={(page: number) => filters.setState({ page })}
            onRowsPerPageChange={(take: number) => filters.setState({ take, page: 1 })}
            currentPageItemCount={contacts.length}
          />
        </>
      )}
    </Card>
  )
}

export default ContactView
