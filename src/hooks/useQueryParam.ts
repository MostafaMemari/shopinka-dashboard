'use client'

import { useQueryState, type UseQueryStateOptions } from 'nuqs'

export function useQueryParam<T>(key: string, options: UseQueryStateOptions<T>) {
  const { parse, serialize, history = 'replace', scroll = true, shallow = false } = options

  const [value, setValue] = useQueryState<T>(key, {
    ...options,
    parse,
    serialize,
    history,
    scroll,
    shallow
  })

  return [value, setValue] as const
}
