import { reorderFonts, setDefaultFont } from '@/libs/api/font.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Font } from '@/types/app/font.type'
import { useReorder } from '@/hooks/useReorder'

export const useReorderFontsMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderData: { id: number; displayOrder: number }[]) => reorderFonts(orderData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Fonts] })
    },

    onError: error => {
      console.error('Error reordering fonts:', error)
    }
  })
}

export const useFontReorder = (initialData: Font[]) => {
  const reorderMutation = useReorderFontsMutation()

  const { rows, moveUp, moveDown, setRows } = useReorder<Font>(initialData, updatedRows => {
    reorderMutation.mutate(
      updatedRows.map((row, index) => ({
        id: row.id,
        displayOrder: index + 1
      }))
    )
  })

  return { rows, moveUp, moveDown, setRows }
}

export const useSetDefaultFontMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => setDefaultFont(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Fonts] })
    },
    onError: error => {
      console.error('Error setting default font:', error)
    }
  })
}
