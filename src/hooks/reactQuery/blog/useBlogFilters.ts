'use client'

import { useMemo } from 'react'
import { parseAsInteger, parseAsString } from 'nuqs'
import { useQuerySetState } from '@/hooks/useQuerySetState'

export const useBlogFilters = () => {
  const filters = useQuerySetState({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10)
  })

  const queryParams = useMemo(
    () => ({
      search: filters.state.search || undefined,
      page: filters.state.page,
      take: filters.state.take
    }),
    [filters.state]
  )

  return { filters, queryParams }
}
