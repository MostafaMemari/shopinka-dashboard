import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { bulkPricingSchema } from '@/libs/validators/bulkPricing.schema'
import { BulkPricingFormType, BulkPricingItem, BulkPricingType } from '@/types/app/bulkPricing.type'

interface UsePageFormProps {
  initialData?: BulkPricingItem
}

export const useBulkPricingFormFields = ({ initialData }: UsePageFormProps) => {
  const defaultValues: BulkPricingFormType = {
    productId: initialData?.productId ?? null,
    variantId: initialData?.variantId ?? null,
    minQty: initialData?.minQty ?? 1,
    discount: initialData?.discount ? Number(initialData.discount) : 0,
    isGlobal: initialData?.isGlobal ?? false,
    type: initialData?.type ?? BulkPricingType.PERCENT
  }

  const methods = useForm<BulkPricingFormType>({
    resolver: yupResolver(bulkPricingSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
