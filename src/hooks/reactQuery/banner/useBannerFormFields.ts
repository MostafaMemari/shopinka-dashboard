import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { bannerSchema } from '@/libs/validators/banner.schema'
import { Banner, BannerFormType, BannerType } from '@/types/app/banner.type'

interface Props {
  initialData?: Banner
}

export const useBannerFormFields = ({ initialData }: Props) => {
  const defaultValues: BannerFormType = {
    type: initialData?.type ?? BannerType.SIDE,
    imageId: initialData?.imageId ?? null,
    link: initialData?.link ?? '',
    isActive: initialData?.isActive ?? true
  }

  const methods = useForm<BannerFormType>({
    resolver: yupResolver(bannerSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
