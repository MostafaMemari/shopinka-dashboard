'use client'

import ConfirmDeleteModal from '@/components/dialogs/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { removeMaterialSticker } from '@/libs/api/material-sticker.api'

const RemoveMaterialStickerModal = ({ id }: { id: string }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeMaterialSticker(id as string)

        if (res.status === 200) invalidate(QueryKeys.MaterialStickers)

        return res
      }}
      dialogTitle='آیا از حذف روش حمل و نقل اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'روش حمل و نقل با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این روش حمل و نقل را ندارید',
        notFound: 'روش حمل و نقل مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف روش حمل و نقل'
      }}
      buttonText='حذف'
    >
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveMaterialStickerModal
