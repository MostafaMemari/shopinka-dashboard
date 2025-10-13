import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getTags } from '@/libs/api/tag.api'

export function useTags({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchTag = () => getTags({ ...params, includeThumbnailImage: true }).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Tags, params],
    queryFn: fetchTag,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
