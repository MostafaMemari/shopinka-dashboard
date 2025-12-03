import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MaterialSticker, MaterialStickerFormType, SurfaceType } from '@/types/app/material-sticker.type'
import { materialStickerSchema } from '@/libs/validators/material-sticker.schema'

interface Props {
  initialData?: MaterialSticker
}

export const useMaterialStickerFormFields = ({ initialData }: Props) => {
  const defaultValues: MaterialStickerFormType = {
    name: initialData?.name ?? '',
    colorCode: initialData?.colorCode ?? '',
    surface: initialData?.surface ?? SurfaceType.GLOSSY,
    pricePerCM: initialData?.pricePerCM ?? null,
    profitPercent: initialData?.profitPercent ?? 200,
    backgroundFrom: initialData?.backgroundFrom ?? '',
    backgroundTo: initialData?.backgroundTo ?? ''
  }

  const methods = useForm<MaterialStickerFormType>({
    resolver: yupResolver(materialStickerSchema),
    mode: 'onChange',
    defaultValues
  })

  return { methods }
}
