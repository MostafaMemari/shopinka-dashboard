'use client'

import { QueryKeys } from '@/types/enums/query-keys'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCallback } from 'react'
import { useFormSubmit } from '../useFormSubmit'
import { errorBannerMessage } from '@/messages/bannerMessages'
import { Banner, BannerFormType, BannerType } from '@/types/app/banner.type'
import { bannerSchema } from '@/libs/validators/banner.schema'
import { createBanner, getBanners, updateBanner } from '@/libs/api/banner.api'
import { useQuery } from '@tanstack/react-query'
import { QueryOptions } from '@/types/queryOptions'

interface UseBannerFormProps {
  initialData?: Banner
  isUpdate?: boolean
  handleModalClose?: () => void
}

export function useBanners({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchTag = () => getBanners(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Banners, params],
    queryFn: fetchTag,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export const useBannerForm = ({ initialData, isUpdate = false, handleModalClose }: UseBannerFormProps) => {
  const defaultValues: BannerFormType = {
    type: initialData?.type ?? BannerType.SIDE,
    imageId: initialData?.imageId ?? null,
    link: initialData?.link ?? '',
    isActive: initialData?.isActive ?? true
  }

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<BannerFormType>({
    defaultValues,
    resolver: yupResolver(bannerSchema)
  })

  const handleClose = useCallback(() => {
    reset()
    handleModalClose?.()
  }, [reset, handleModalClose])

  const { isLoading, onSubmit } = useFormSubmit<BannerFormType>({
    createApi: createBanner,
    updateApi: updateBanner,
    errorMessages: errorBannerMessage,
    queryKey: QueryKeys.Banners,
    successMessage: isUpdate ? 'بنر با موفقیت به‌روزرسانی شد' : 'بنر با موفقیت ثبت شد',
    noChangeMessage: 'هیچ تغییری اعمال نشده است',
    errorMessage: isUpdate ? 'خطایی در به‌روزرسانی بنر رخ داد' : 'خطای سیستمی رخ داد',
    initialData: initialData ? { ...initialData, id: String(initialData.id) } : undefined,
    isUpdate,
    preprocessData: (data: BannerFormType) => {
      const cleanedData = { ...data }

      return cleanedData as BannerFormType
    }
  })

  return {
    control,
    errors,
    isLoading,
    setValue,
    onSubmit: handleSubmit(data => onSubmit(data, handleModalClose ?? (() => {}))),
    handleClose
  }
}
