import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Shipping, ShippingFormType } from '@/types/app/shipping.type'
import { shippingSchema } from '@/libs/validators/shipping.schema'

interface UsePageFormProps {
  initialData?: Shipping
}

export const useShippingFormFields = ({ initialData }: UsePageFormProps) => {
  const defaultValues: ShippingFormType = {
    name: initialData?.name ?? '',
    price: initialData?.price ?? 0,
    estimatedDays: initialData?.estimatedDays ?? null,
    isActive: initialData?.isActive ?? true
  }

  const methods = useForm<ShippingFormType>({
    resolver: yupResolver(shippingSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
