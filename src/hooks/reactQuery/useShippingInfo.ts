import { getAttributes } from '@/libs/api/attributes.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'

import { errorAttributeMessage } from '@/messages/attributeMessages'
import { ShippingInfo, ShippingInfoType } from '@/types/app/shippingInfo.type'
import { addShippingInfo, updateShippingInfo } from '@/libs/api/shippingInfo.api'
import { useFormMutation } from '../useFormMutation'

export function useShippingInfo({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchAttribute = () => getAttributes(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Attributes, params],
    queryFn: fetchAttribute,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseShippingInfoFormProps {
  initialData?: ShippingInfo
  onSuccess?: () => void
}

export const useShippingInfoForm = ({ initialData, onSuccess }: UseShippingInfoFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<ShippingInfoType>({
    createApi: addShippingInfo,
    updateApi: updateShippingInfo,
    errorMessages: errorAttributeMessage,
    queryKey: [QueryKeys.ShippingInfo, QueryKeys.Orders],
    successMessage: isUpdate ? 'اطلاعات ارسال با موفقیت آپدیت شد' : 'اطلاعات ارسال با موفقیت ثبت شد',
    isUpdate,
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}
