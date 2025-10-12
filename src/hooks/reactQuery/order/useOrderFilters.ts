'use client'

import { useMemo, useEffect, useState } from 'react'
import { parseAsInteger, parseAsString } from 'nuqs'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { useDebounce } from '@/hooks/useDebounce'

export const useOrderFilters = () => {
  const filters = useQuerySetState({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10)
  })

  const [searchInput, setSearchInput] = useState(filters.state.search || '')
  const debouncedSearch = useDebounce(searchInput, 500)

  useEffect(() => {
    if (debouncedSearch !== filters.state.search) {
      filters.setState({ search: debouncedSearch, page: 1 })
    }
  }, [debouncedSearch, filters])

  const queryParams = useMemo(
    () => ({
      search: filters.state.search || undefined,
      page: filters.state.page,
      take: filters.state.take
    }),
    [filters.state]
  )

  const actions = {
    setSearchInput,
    setPage: (page: number) => filters.setState({ page }),
    setPerPage: (take: number) => filters.setState({ take, page: 1 })
  }

  return {
    queryParams,
    state: {
      search: filters.state.search,
      page: filters.state.page,
      take: filters.state.take,
      searchInput
    },
    actions
  }
}
