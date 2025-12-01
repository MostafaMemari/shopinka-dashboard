import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Font, FontFormType } from '@/types/app/font.type'
import { fontSchema } from '@/libs/validators/font.schema'

interface UsePageFormProps {
  initialData?: Font
}

export const useFontFormFields = ({ initialData }: UsePageFormProps) => {
  const defaultValues: FontFormType = {
    name: initialData?.name ?? '',
    displayName: initialData?.displayName ?? '',
    lineHeight: initialData?.lineHeight ?? 1.5,
    size: initialData?.size ?? 14,
    isPersian: initialData?.isPersian ?? true,
    difficultyRatio: initialData?.difficultyRatio ?? 1,
    fileId: initialData?.fileId ?? null,
    thumbnailId: initialData?.thumbnailId ?? null
  }

  const methods = useForm<FontFormType>({
    resolver: yupResolver(fontSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
