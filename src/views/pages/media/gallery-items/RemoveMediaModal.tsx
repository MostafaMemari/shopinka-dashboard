import { useState } from 'react'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { removeGalleryItem } from '@/libs/api/galleyItem.api'
import { showToast } from '@/utils/showToast'
import { Button } from '@mui/material'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import FormActions from '@/components/FormActions'
import { toast } from 'react-toastify'

interface RemoveGalleryItemModalProps {
  selectedImages: string[]
  onClearSelection: () => void
}

const RemoveGalleryItemModal = ({ selectedImages, onClearSelection }: RemoveGalleryItemModalProps) => {
  const [open, setOpen] = useState<boolean>(false)
  const [galleryItemIds, setGalleryItemIds] = useState<string[] | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const { invalidate } = useInvalidateQuery()

  const handleOpen = (selected: string[]) => {
    setGalleryItemIds(selected)
    setOpen(true)
  }

  const handleConfirm = async () => {
    if (!galleryItemIds || isDeleting) return

    setOpen(false)

    const deleteToastId = toast.info('در حال حذف فایل‌ها...', {
      autoClose: false,
      hideProgressBar: false,
      position: 'top-left',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })

    setIsDeleting(true)

    try {
      const res = await removeGalleryItem(galleryItemIds)

      toast.dismiss(deleteToastId)

      if (res.status === 200) {
        showToast({ type: 'success', message: 'حذف فایل با موفقیت انجام شد' })
        onClearSelection()
        invalidate(QueryKeys.GalleryItems)
      } else if (res.status === 400) {
        showToast({ type: 'error', message: 'حذف فایل با خطا مواجه شد' })
      } else if (res.status === 404) {
        showToast({ type: 'error', message: 'شما دسترسی حذف این فایل را ندارید' })
      }

      setGalleryItemIds(null)
    } catch (error) {
      toast.dismiss(deleteToastId)
      showToast({ type: 'error', message: 'خطای سیستمی' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
    setGalleryItemIds(null)
  }

  return (
    <>
      <div>
        <Button variant='outlined' color='error' onClick={() => handleOpen(selectedImages)}>
          حذف {selectedImages.length} مورد
        </Button>

        <CustomDialog
          open={open}
          onClose={handleCancel}
          title='آیا از حذف فایل اطمینان دارید؟'
          defaultMaxWidth='sm'
          actions={<FormActions submitText='حذف' submitColor='error' onCancel={handleCancel} onSubmit={handleConfirm} isLoading={isDeleting} />}
        />
      </div>
    </>
  )
}

export default RemoveGalleryItemModal
