import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AttributeValue, AttributeValueFormType } from '@/types/app/productAttributes.type'
import { AttributeValueSchema } from '@/libs/validators/attributeValues.schema'

interface UseAttributeFormFieldsProps {
  initialData?: AttributeValue
  attributeId?: string
}

export const useAttributeValueFormFields = ({ initialData, attributeId }: UseAttributeFormFieldsProps) => {
  const defaultValues: AttributeValueFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    colorCode: initialData?.colorCode ?? '',
    buttonLabel: initialData?.buttonLabel ?? '',

    attributeId: String(attributeId ?? initialData?.attributeId ?? '')
  }

  const methods = useForm<AttributeValueFormType>({
    defaultValues,
    resolver: yupResolver(AttributeValueSchema)
  })

  return methods
}
