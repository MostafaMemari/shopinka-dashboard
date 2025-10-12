import { useEffect, useState } from 'react'
import { useQueryState } from 'nuqs'
import { useDebounce } from '@/hooks/useDebounce'

export function useSearchQuery(debounceDelay = 500) {
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    parse: String,
    scroll: true
  })

  const [inputValue, setInputValue] = useState(search)
  const debouncedInputValue = useDebounce(inputValue, debounceDelay)

  useEffect(() => {
    setInputValue(search)
  }, [search])

  useEffect(() => {
    setSearch(debouncedInputValue?.trim() ? debouncedInputValue : null)
  }, [debouncedInputValue, setSearch])

  return {
    search,
    inputValue,
    setInputValue
  }
}
