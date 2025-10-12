'use client'

import { useQuerySetState } from '@/hooks/useQuerySetState'
import { parseAsArrayOf, parseAsInteger, parseAsString } from 'nuqs'

export const useProductFilters = () => {
  const filters = useQuerySetState({
    search: parseAsString.withDefault(''),
    type: parseAsString.withDefault(''),
    categoryIds: parseAsArrayOf(parseAsInteger).withDefault([]),
    tagIds: parseAsArrayOf(parseAsInteger).withDefault([]),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10)
  })

  const queryParams = {
    name: filters.state.search || undefined,
    type: filters.state.type || undefined,
    categoryIds: filters.state.categoryIds.length ? filters.state.categoryIds : undefined,
    tagIds: filters.state.tagIds.length ? filters.state.tagIds : undefined,
    page: filters.state.page,
    take: filters.state.take
  }

  return { filters, queryParams }
}
