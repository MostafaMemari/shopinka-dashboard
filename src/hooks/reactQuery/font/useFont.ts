import { getFonts } from '@/libs/api/font.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useFonts({ enabled = true, params = {}, staleTime = 5 * 60 * 1000 }: QueryOptions) {
  const fetchFont = () => getFonts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Fonts, params],
    queryFn: fetchFont,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
