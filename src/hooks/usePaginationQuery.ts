import { useQueryStates } from 'nuqs'
import { useCallback } from 'react'

export function usePaginationQuery() {
  const [{ page, limit }, setQuery] = useQueryStates({
    page: { defaultValue: 1, parse: Number, scroll: true },
    limit: { defaultValue: 10, parse: Number, scroll: true }
  })

  const handlePageChange = useCallback(
    (newPage: number) => {
      setQuery(prev => ({
        ...prev,
        page: newPage
      }))
    },
    [setQuery]
  )

  const handleRowsPerPageChange = useCallback(
    (newLimit: number) => {
      setQuery(prev => ({
        ...prev,
        limit: newLimit,
        page: 1
      }))
    },
    [setQuery]
  )

  return {
    page,
    limit,
    handlePageChange,
    handleRowsPerPageChange
  }
}
