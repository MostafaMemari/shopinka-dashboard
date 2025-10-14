'use client'

import React, { ReactNode, useState } from 'react'
import { Button } from '@mui/material'
import CustomDialog from '@/components/dialogs/CustomDialog'
import { showToast } from '@/utils/showToast'
import { createGalleryItem } from '@/libs/api/galleyItem.api'
import { type SelectChangeEvent } from '@mui/material'
import GallerySelectModal from './GallerySelectModal'
import DropzoneSection from './DropzoneSection'
import FileList from './FileList'
import FormActions from '@/components/FormActions'
import { useInvalidateQuery } from '@/hooks/useInvalidateQuery'
import { QueryKeys } from '@/types/enums/query-keys'
import { toast } from 'react-toastify'

interface Props {
  galleryId?: string
  trigger?: ReactNode
}

const UploadMediaDoalog = ({ galleryId, trigger }: Props) => {
  const [openUpload, setOpenUpload] = useState(false)
  const [openGallerySelect, setOpenGallerySelect] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedGalleryId, setSelectedGalleryId] = useState<string>('')
  const maxFiles = 5

  const { invalidate } = useInvalidateQuery()

  const handleOpen = () => {
    if (galleryId) {
      setOpenUpload(true)
    } else {
      setOpenGallerySelect(true)
    }
  }

  const handleCloseUpload = () => {
    setOpenUpload(false)
    setFiles([])
    setSelectedGalleryId('')
  }

  const handleCloseGallerySelect = () => {
    setOpenGallerySelect(false)
    setSelectedGalleryId('')
  }

  const handleGalleryChange = (event: SelectChangeEvent<string>) => {
    const newGalleryId = event.target.value

    setSelectedGalleryId(newGalleryId)
    setOpenGallerySelect(false)
    setOpenUpload(true)
  }

  const handleRemoveFile = (file: File) => {
    setFiles(files.filter(f => f.name !== file.name))
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleSubmit = async () => {
    if (!files.length) {
      showToast({ type: 'error', message: 'هیچ فایلی انتخاب نشده است!' })

      return
    }

    const effectiveGalleryId = galleryId || selectedGalleryId

    if (!effectiveGalleryId) {
      showToast({ type: 'error', message: 'لطفاً یک گالری انتخاب کنید!' })

      return
    }

    handleCloseUpload()

    const uploadToastId = toast.info('در حال آپلود فایل‌ها...', {
      autoClose: false,
      hideProgressBar: false,
      position: 'top-left',
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })

    setIsSubmitting(true)

    try {
      const formData = new FormData()

      files.forEach(file => formData.append('image', file))
      formData.append('galleryId', effectiveGalleryId)

      const res = await createGalleryItem(formData)

      toast.dismiss(uploadToastId)

      if (res?.status === 200 || res?.status === 201) {
        showToast({ type: 'success', message: 'آپلود فایل با موفقیت انجام شد' })
        invalidate(QueryKeys.GalleryItems)
      } else {
        showToast({ type: 'error', message: 'خطایی در آپلود رخ داد!' })
      }
    } catch (error) {
      showToast({ type: 'error', message: 'خطایی در ارتباط با سرور رخ داد!' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {trigger}
      </div>

      <GallerySelectModal open={openGallerySelect} selectedGalleryId={selectedGalleryId} onClose={handleCloseGallerySelect} onChange={handleGalleryChange} />

      <CustomDialog
        open={openUpload}
        onClose={handleCloseUpload}
        title='آپلود فایل جدید'
        defaultMaxWidth='md'
        actions={
          <>
            {files.length > 0 && (
              <Button color='error' variant='outlined' onClick={handleRemoveAllFiles} style={{ marginRight: 8 }}>
                حذف همه
              </Button>
            )}

            <FormActions submitText='آپلود' onCancel={handleCloseUpload} onSubmit={handleSubmit} isLoading={isSubmitting} />
          </>
        }
      >
        <DropzoneSection files={files} setFiles={setFiles} maxFiles={maxFiles} />
        {files.length > 0 && <FileList files={files} onRemoveFile={handleRemoveFile} />}
      </CustomDialog>
    </>
  )
}

export default UploadMediaDoalog
