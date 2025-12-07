import { useState } from 'react'
import { reorderArray } from '@/utils/array'

export const useReorder = <T extends { id: number }>(initialData: T[], onSave?: (updatedRows: T[]) => void) => {
  const [rows, setRows] = useState([...initialData].sort((a, b) => (a as any).displayOrder - (b as any).displayOrder))

  const moveUp = (id: number) => {
    const index = rows.findIndex(r => r.id === id)

    if (index === 0) return
    const newRows = reorderArray(rows, index, index - 1)

    setRows(newRows)
    onSave?.(newRows)
  }

  const moveDown = (id: number) => {
    const index = rows.findIndex(r => r.id === id)

    if (index === rows.length - 1) return
    const newRows = reorderArray(rows, index, index + 1)

    setRows(newRows)
    onSave?.(newRows)
  }

  return { rows, moveUp, moveDown, setRows }
}
