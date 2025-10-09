import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getPages } from '@/libs/api/page.api'

export function usePages({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchPage = () => getPages(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Pages, params],
    queryFn: fetchPage,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
