import { getMaterialStickers } from '@/libs/api/material-sticker.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

export function useMaterialStickers({ enabled = true, params = {}, staleTime = 5 * 60 * 1000 }: QueryOptions) {
  const fetchMaterialStickers = () => getMaterialStickers(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.MaterialStickers, params],
    queryFn: fetchMaterialStickers,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
