import { getProductVariants } from '@/libs/api/productVariants.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useProductVariants({ enabled = true, params = {} }: QueryOptions) {
  const fetchProductVariants = () => getProductVariants(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.ProductVariants, params],
    queryFn: fetchProductVariants,
    enabled,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  })
}
