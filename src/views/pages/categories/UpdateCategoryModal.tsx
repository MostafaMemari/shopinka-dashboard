'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import CategoryForm from './CategoryForm'
import FormActions from '@/components/FormActions'
import { Category, CategoryType } from '@/types/app/category.type'
import { useCategoryForm } from '@/hooks/reactQuery/useCategory'
import { categoryFormSchema, CategoryFormType } from '@/libs/validators/category.schema'
import { RobotsTag } from '@/types/enums/robotsTag'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { transformToStringArray } from '@/utils/transformToStringArray'

interface UpdateCategoryModalProps {
  children: ReactNode
  category: Category
}

const UpdateCategoryModal = ({ children, category }: UpdateCategoryModalProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const defaultValues: CategoryFormType = {
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
    parentId: category?.parentId || null,
    type: category?.type ?? CategoryType.PRODUCT,
    thumbnailImageId: category?.thumbnailImageId ?? null,

    seo_title: category?.seoMeta?.title ?? '',
    seo_description: category?.seoMeta?.description ?? '',
    seo_keywords: transformToStringArray(category?.seoMeta?.keywords) ?? [],
    seo_canonicalUrl: category?.seoMeta?.canonicalUrl ?? '',
    seo_robotsTag: category?.seoMeta?.robotsTag ?? RobotsTag.INDEX_FOLLOW
  }

  const methods = useForm<CategoryFormType>({
    defaultValues,
    resolver: yupResolver(categoryFormSchema)
  })

  const { mutate, isPending } = useCategoryForm({
    initialData: category,
    onSuccess: () => {
      handleClose()
    }
  })

  const onSubmit = methods.handleSubmit(data => mutate(data))

  return (
    <div>
      <div onClick={handleOpen} role='button' tabIndex={0} onKeyDown={e => e.key === 'Enter' && handleOpen()}>
        {children || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-edit' />}>
            بروزرسانی دسته‌بندی
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ویرایش دسته‌بندی'
        defaultMaxWidth='lg'
        actions={<FormActions onSubmit={onSubmit} onCancel={handleClose} isLoading={isPending} submitText={category ? 'بروزرسانی' : 'ثبت'} />}
      >
        <FormProvider {...methods}>
          <CategoryForm isLoading={isPending} category={category} />
        </FormProvider>
      </CustomDialog>
    </div>
  )
}

export default UpdateCategoryModal
