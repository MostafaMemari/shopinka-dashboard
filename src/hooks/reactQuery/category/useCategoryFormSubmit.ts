'use client'

import { useFormMutation } from '@/hooks/useFormMutation'
import { createCategory, updateCategory } from '@/libs/api/category.api'
import { errorCategoryMessage } from '@/messages/categoryMessages'
import { Category, CategoryFormType } from '@/types/app/category.type'
import { QueryKeys } from '@/types/enums/query-keys'

interface Props {
  initialData?: Category
  onSuccess?: () => void
}

export const useCategoryFormSubmit = ({ initialData, onSuccess }: Props) => {
  const isUpdate = !!initialData

  return useFormMutation<CategoryFormType & { id?: string }>({
    createApi: async (formData: CategoryFormType) => {
      const response = await createCategory(formData)

      return { status: response.status, data: { id: response.data?.category?.id } }
    },

    updateApi: async (categoryId: string, formData: Partial<CategoryFormType>) => {
      return updateCategory(Number(categoryId), formData as Partial<CategoryFormType>)
    },
    queryKey: [QueryKeys.Category, QueryKeys.Categories],
    errorMessages: errorCategoryMessage,
    successMessage: isUpdate ? 'دسته بندی با موفقیت به‌روزرسانی شد' : 'دسته بندی با موفقیت ایجاد شد',
    initialData: initialData ? ({ ...initialData, id: String(initialData.id) } as any) : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}
