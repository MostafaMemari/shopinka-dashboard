import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AttributeFormType, AttributeType } from '@/types/app/productAttributes.type'
import { attributeSchema } from '@/libs/validators/attribute.schema'

interface UseAttributeFormFieldsProps {
  initialData?: AttributeFormType
}

export const useAttributeFormFields = ({ initialData }: UseAttributeFormFieldsProps) => {
  const defaultValues: AttributeFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    type: initialData?.type ?? AttributeType.COLOR,
    description: initialData?.description ?? ''
  }

  const methods = useForm<AttributeFormType>({
    defaultValues,
    resolver: yupResolver(attributeSchema)
  })

  return methods
}
