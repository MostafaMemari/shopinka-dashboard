import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GalleryItem, GalleryItemFormType } from '@/types/app/galleryItem.type'
import { GalleryItemSchema } from '@/libs/validators/galleryItem.schema'

interface Props {
  initialData?: GalleryItem
}

export const useGalleryItemFormFields = ({ initialData }: Props) => {
  const defaultValues: GalleryItemFormType = {
    title: initialData?.title ?? '',
    description: initialData?.description ?? ''
  }

  const methods = useForm<GalleryItemFormType>({
    resolver: yupResolver(GalleryItemSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
