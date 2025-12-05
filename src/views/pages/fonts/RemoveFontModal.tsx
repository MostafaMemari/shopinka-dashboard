'use client'

import ConfirmDeleteModal from '@/components/dialogs/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { removeFont } from '@/libs/api/font.api'

const RemoveShippingModal = ({ id }: { id: string }) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeFont(id as string)

        if (res.status === 200) invalidate(QueryKeys.Fonts)

        return res
      }}
      dialogTitle='آیا از حذف فونت و نقل اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'فونت و نقل با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این فونت و نقل را ندارید',
        notFound: 'فونت و نقل مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف فونت و نقل'
      }}
      buttonText='حذف'
    >
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveShippingModal
