import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Page, PageFormType } from '@/types/app/page.type'
import { pageSchema } from '@/libs/validators/page.schema'

interface UsePageFormProps {
  initialData?: Page
}

export const usePageFormFields = ({ initialData }: UsePageFormProps) => {
  const defaultValues: PageFormType = {
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? ''
  }

  const methods = useForm<PageFormType>({
    resolver: yupResolver(pageSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
