import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getBanners } from '@/libs/api/banner.api'

export function useBanners({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchTag = () => getBanners({ ...params, includeImage: true }).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Banners, params],
    queryFn: fetchTag,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
