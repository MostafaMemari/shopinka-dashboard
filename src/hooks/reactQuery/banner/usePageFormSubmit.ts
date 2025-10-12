'use client'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createBanner, updateBanner } from '@/libs/api/banner.api'
import { errorBannerMessage } from '@/messages/bannerMessages'
import { Banner, BannerFormType } from '@/types/app/banner.type'
import { QueryKeys } from '@/types/enums/query-keys'

interface UseBannerFormProps {
  initialData?: Banner
  onSuccess?: () => void
}

export const useBannerFormSubmit = ({ initialData, onSuccess }: UseBannerFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<BannerFormType & { id?: string }>({
    createApi: createBanner,
    updateApi: (id, data) => updateBanner(Number(id), data),
    errorMessages: errorBannerMessage,
    queryKey: QueryKeys.Banners,
    successMessage: isUpdate ? 'بنر با موفقیت به‌روزرسانی شد' : 'بنر با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}
