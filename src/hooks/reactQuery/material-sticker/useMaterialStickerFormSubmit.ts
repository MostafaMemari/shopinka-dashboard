'use client'

import { QueryKeys } from '@/types/enums/query-keys'

import { useFormMutation } from '@/hooks/useFormMutation'
import { MaterialSticker, MaterialStickerFormType } from '@/types/app/material-sticker.type'
import { createMaterialSticker, updateMaterialSticker } from '@/libs/api/material-sticker.api'
import { errorMaterialStickerMessage } from '@/messages/materialStickerMessages'

interface UseMaterialStickerFormProps {
  initialData?: MaterialSticker
}

export const useMaterialStickerFormSubmit = ({ initialData }: UseMaterialStickerFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<MaterialStickerFormType & { id?: string }>({
    createApi: createMaterialSticker,
    updateApi: updateMaterialSticker,
    errorMessages: errorMaterialStickerMessage,
    queryKey: QueryKeys.MaterialStickers,
    successMessage: isUpdate ? 'متریال با موفقیت به‌روزرسانی شد' : 'متریال با موفقیت ایجاد شد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate
  })
}
