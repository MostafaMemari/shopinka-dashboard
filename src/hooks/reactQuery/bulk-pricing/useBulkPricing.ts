import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getBulkPricings } from '@/libs/api/bulkPricing.api'

export function useBulkPricing({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchPage = () => getBulkPricings(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.BulkPricings, params],
    queryFn: fetchPage,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
