import ConfirmDeleteModal from '@/components/dialogs/ConfirmDeleteModal'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { removeBulkPricing } from '@/libs/api/bulkPricind.api'
import { QueryKeys } from '@/types/enums/query-keys'
import { ReactNode } from 'react'

interface Props {
  id: number
  children: ReactNode
}

const RemoveBulkPricingDialog = ({ id, children }: Props) => {
  const { invalidate } = useInvalidateQuery()

  return (
    <ConfirmDeleteModal
      id={id}
      onDelete={async id => {
        const res = await removeBulkPricing(id as string)

        if (res.status === 200) invalidate(QueryKeys.BulkPricings)

        return res
      }}
      dialogTitle='آیا از حذف فروش عمده اطمینان دارید؟'
      dialogMessage=''
      messages={{
        success: 'فروش عمده با موفقیت حذف شد',
        unauthorized: 'شما اجازه حذف این فروش عمده را ندارید',
        notFound: 'فروش عمده مورد نظر یافت نشد',
        error: 'خطای عمومی هنگام حذف فروش عمده'
      }}
      buttonText='حذف'
    >
      {children}
    </ConfirmDeleteModal>
  )
}

export default RemoveBulkPricingDialog
