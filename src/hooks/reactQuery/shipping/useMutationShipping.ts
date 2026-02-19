import { setDefaultShiping } from '@/libs/api/shipping.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSetDefaultShippingMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => setDefaultShiping(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Shippings] })
    },
    onError: error => {
      console.error('Error setting default shipping method:', error)
    }
  })
}
