import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ProductVariant, ProductVariantForm } from '@/types/app/productVariant.type'
import { productVariantSchema } from '@/libs/validators/productVariant.schema'

interface UseProductFormProps {
  initialData?: ProductVariant
}

export const useProductVariantFormFields = ({ initialData }: UseProductFormProps) => {
  const defaultValues: ProductVariantForm = {
    sku: initialData?.sku ?? '',
    shortDescription: initialData?.shortDescription ?? '',
    quantity: initialData?.quantity ?? null,
    basePrice: initialData?.basePrice ?? null,
    salePrice: initialData?.salePrice ?? null,
    mainImageId: initialData?.mainImageId ?? null,
    width: initialData?.width ?? null,
    height: initialData?.height ?? null,
    length: initialData?.length ?? null,
    weight: initialData?.weight ?? null,

    attributeValueIds: initialData?.attributeValues?.map(att => att.id) ?? []
  }

  const methods = useForm<ProductVariantForm>({
    defaultValues,
    resolver: yupResolver(productVariantSchema)
  })

  return { methods }
}
