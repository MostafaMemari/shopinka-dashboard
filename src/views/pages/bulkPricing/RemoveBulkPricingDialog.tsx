import ConfirmDeleteModal from '@/components/dialogs/ConfirmDeleteModal'
import { IconButton } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { removeBulkPricing } from '@/libs/api/bulkPricing.api'

const RemoveBulkPricingDialog = ({ id }: { id: string }) => {
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
      <IconButton size='small'>
        <i className='tabler-trash text-gray-500 text-lg' />
      </IconButton>
    </ConfirmDeleteModal>
  )
}

export default RemoveBulkPricingDialog
