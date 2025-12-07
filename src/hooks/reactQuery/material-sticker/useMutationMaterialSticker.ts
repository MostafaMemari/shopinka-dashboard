import { reorderMaterialStickers } from '@/libs/api/material-sticker.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MaterialSticker } from '@/types/app/material-sticker.type'
import { useReorder } from '@/hooks/useReorder'

export const useReorderMaterialStickersMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderData: { id: number; displayOrder: number }[]) => reorderMaterialStickers(orderData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MaterialStickers] })
    },

    onError: error => {
      console.error('Error reordering material stickers:', error)
    }
  })
}

export const useMaterialStickerReorder = (initialData: MaterialSticker[]) => {
  const reorderMutation = useReorderMaterialStickersMutation()

  const { rows, moveUp, moveDown, setRows } = useReorder<MaterialSticker>(initialData, updatedRows => {
    reorderMutation.mutate(
      updatedRows.map((row, index) => ({
        id: row.id,
        displayOrder: index + 1
      }))
    )
  })

  return { rows, moveUp, moveDown, setRows }
}
