import { createCategory, getCategories, updateCategory } from '@/libs/api/category.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { CategoryFormType } from '@/libs/validators/category.schema'
import { Category } from '@/types/app/category.type'
import { errorCategoryMessage } from '@/messages/categoryMessages'
import { useFormMutation } from '../useFormMutation'

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchCategory = () => getCategories({ ...params, includeChildren: true, childrenDepth: 6 }).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: fetchCategory,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

interface UseCategoryFormProps {
  initialData?: Category
  onSuccess?: () => void
}

export const useCategoryForm = ({ initialData, onSuccess }: UseCategoryFormProps) => {
  const isUpdate = !!initialData

  return useFormMutation<CategoryFormType>({
    createApi: createCategory,
    updateApi: updateCategory,
    errorMessages: errorCategoryMessage,
    queryKey: QueryKeys.Categories,
    successMessage: isUpdate ? 'دسته‌بندی با موفقیت به‌روزرسانی شد' : 'دسته‌بندی با موفقیت ایجاد شد',
    initialData: initialData
      ? {
          ...initialData,
          id: String(initialData.id),
          seo_canonicalUrl: initialData.seoMeta?.canonicalUrl,
          seo_description: initialData.seoMeta?.description,
          seo_keywords: initialData.seoMeta?.keywords,
          seo_robotsTag: initialData.seoMeta?.robotsTag,
          seo_title: initialData.seoMeta?.title
        }
      : undefined,
    isUpdate,
    onSuccess: () => {
      onSuccess?.()
    }
  })
}
