import { useMutation } from '@tanstack/react-query'
import { showToast } from '@/utils/showToast'
import { cleanObject } from '@/utils/formatters'
import { handleApiError } from '@/utils/handleApiError'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { getChangedFields } from '@/utils/getChangedFields'
import { QueryKeys } from '@/types/enums/query-keys'

interface UseFormMutationProps<T extends Record<string, any>> {
  createApi?: (data: T) => Promise<{ status: number; data?: any }>
  updateApi?: (id: string, data: Partial<T>) => Promise<{ status: number; data?: any }>
  errorMessages: Record<number, string>
  queryKey: QueryKeys | QueryKeys[]
  successMessage: string
  noChangeMessage?: string
  errorMessage?: string
  initialData?: Partial<T & { id: string }>
  isUpdate?: boolean
  preprocessData?: (data: T) => T
  onSuccess?: (response: { status: number; data?: any }) => void
}

export function useFormMutation<T extends Record<string, any>>({
  createApi,
  updateApi,
  errorMessages,
  queryKey,
  successMessage,
  noChangeMessage = 'هیچ تغییری اعمال نشده است',
  errorMessage = 'خطای سیستمی رخ داد',
  initialData,
  isUpdate = false,
  preprocessData,
  onSuccess
}: UseFormMutationProps<T>) {
  const { invalidate } = useInvalidateQuery()

  return useMutation({
    mutationFn: async (formData: T) => {
      const processedData = preprocessData ? preprocessData(formData) : formData
      const cleanedData = cleanObject(processedData)

      if (isUpdate && initialData?.id && updateApi) {
        const changedData = getChangedFields(initialData as unknown as T, cleanedData, ['mainImageId', 'mainImage', 'thumbnailImageId'])

        // if (Object.keys(changedData).length === 0) {
        //   showToast({ type: 'info', message: noChangeMessage })

        //   return { status: 200, data: initialData }
        // }

        return await updateApi(String(initialData.id), changedData)
      }

      if (createApi) {
        return await createApi(cleanedData as T)
      }

      throw new Error('No API function provided')
    },
    onSuccess: response => {
      const apiErrorMessage = handleApiError(response.status, errorMessages)

      if (apiErrorMessage) {
        showToast({ type: 'error', message: apiErrorMessage })

        return
      }

      if (response.status === 200 || response.status === 201) {
        showToast({ type: 'success', message: successMessage })
        invalidate(queryKey)
        onSuccess?.(response)
      }
    },
    onError: () => {
      showToast({
        type: 'error',
        message: isUpdate ? 'خطایی در به‌روزرسانی رخ داد' : errorMessage
      })
    }
  })
}
