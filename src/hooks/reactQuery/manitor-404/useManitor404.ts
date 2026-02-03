import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getManitor404s } from '@/libs/api/manitor-404.api'

export function useManitor404({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchPage = () => getManitor404s(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Manitor404s, params],
    queryFn: fetchPage,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
