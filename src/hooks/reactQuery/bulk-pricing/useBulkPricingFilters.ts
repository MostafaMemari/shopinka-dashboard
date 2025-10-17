'use client'

import { useMemo } from 'react'
import { parseAsBoolean, parseAsInteger, parseAsString, createParser } from 'nuqs'
import { useQuerySetState } from '@/hooks/useQuerySetState'
import { BulkPricingType } from '@/types/app/bulkPricing.type'

const parseAsBulkPricingType = createParser<BulkPricingType | ''>({
  parse: value => {
    if (value === BulkPricingType.PERCENT || value === BulkPricingType.FIXED) {
      return value
    }

    return ''
  },
  serialize: value => (value ? String(value) : '')
})

export const useBulkPricingFilters = () => {
  const filters = useQuerySetState({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1),
    take: parseAsInteger.withDefault(10),
    isGlobal: parseAsBoolean.withDefault(true),
    type: parseAsBulkPricingType.withDefault('')
  })

  const queryParams = useMemo(
    () => ({
      search: filters.state.search || undefined,
      page: filters.state.page,
      take: filters.state.take,
      isGlobal: filters.state.isGlobal,
      type: filters.state.type || undefined
    }),
    [filters.state]
  )

  return { filters, queryParams }
}
