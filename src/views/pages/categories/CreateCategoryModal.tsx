'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useCategoryForm } from '@/hooks/reactQuery/useCategory'
import { CategoryFormType, categoryFormSchema } from '@/libs/validators/category.schema'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CategoryForm from './CategoryForm'

interface CreateCategoryModalProps {
  children?: ReactNode
}

const CreateCategoryModal = ({ children }: CreateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categoryFormSchema)
  })

  const { mutate, isPending } = useCategoryForm({
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  return (
    <div>
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت دسته‌بندی جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت دسته‌بندی جدید'
        defaultMaxWidth='md'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <FormProvider {...methods}>
          <CategoryForm isLoading={isPending} />
        </FormProvider>
      </CustomDialog>
    </div>
  )
}

export default CreateCategoryModal
