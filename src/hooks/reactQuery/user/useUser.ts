import { getUsers } from '@/libs/api/user.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useUsers({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchUser = () => getUsers({ ...params, includeAddress: true, includeTransaction: true, includeShippingInfo: true }).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Users, params],
    queryFn: fetchUser,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
