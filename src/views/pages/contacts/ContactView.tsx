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
import { useQueryState } from 'nuqs'

const ContactView = () => {
  const [page, setPage] = useQueryState('page', { defaultValue: 1, parse: Number, scroll: true })
  const [size, setSize] = useQueryState('limit', { defaultValue: 10, parse: Number, scroll: true })
  const [search, setSearch] = useQueryState('search', { defaultValue: '', parse: String, scroll: true })

  const [inputValue, setInputValue] = useState(search)
  const debounceDelay = 500
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useEffect(() => {
    setPage(1)
    setSearch(debouncedInputValue)
  }, [debouncedInputValue, setSearch, setPage])

  const { data, isLoading, isFetching, error, refetch } = useContacts({
    enabled: true,
    params: { page, take: size },
    staleTime: 60 * 1000
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
        <EmptyContactState isSearch={!!search} searchQuery={search} />
      ) : (
        <>
          <DesktopContactTable contacts={contacts} />
          <TablePaginationComponent
            currentPage={paginationData.currentPage}
            totalPages={paginationData.totalPages}
            totalCount={paginationData.totalCount}
            rowsPerPage={size}
            onPageChange={setPage}
            onRowsPerPageChange={setSize}
            currentPageItemCount={contacts.length}
          />
        </>
      )}
    </Card>
  )
}

export default ContactView
