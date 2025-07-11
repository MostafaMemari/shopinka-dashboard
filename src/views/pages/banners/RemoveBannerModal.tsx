import ConfirmDeleteModal from '@/components/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeBanner } from '@/libs/api/banner.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface RemoveTagModalProps {
  id: number
  children: ReactNode
}

const RemoveTagModal = ({ id, children }: RemoveTagModalProps) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeBanner(id as string)

        if (res.status === 200) invalidate(QueryKeys.Banners)

        return res
      }}
      dialogTitle='آیا از حذف بنر اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'بنر با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این بنر را ندارید',
        notFound: 'بنر مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف بنر'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveTagModal
