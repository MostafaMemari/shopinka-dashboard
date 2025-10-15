'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { categoryFormSchema } from '@/libs/validators/category.schema'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid2'
import { Category, CategoryFormType, CategoryType } from '@/types/app/category.type'
import FormField from '@/components/form/FormField'
import { useCategoryFormSubmit } from '@/hooks/reactQuery/category/useCategoryFormSubmit'
import CategorySelect from './CreateAndUpdate/CategorySelect'

interface Props {
  categories?: Category[]
  trigger?: ReactNode
  type: CategoryType
}

const CreateCategoryDialog = ({ trigger, type, categories }: Props) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])

  const methods = useForm<CategoryFormType>({
    resolver: yupResolver(categoryFormSchema)
  })

  const { mutate, isPending } = useCategoryFormSubmit({
    onSuccess: () => {
      handleClose()
    }
  })

  const {
    control,
    reset,
    formState: { errors }
  } = methods

  const onSubmit = methods.handleSubmit(data =>
    mutate(
      { ...data, type },
      {
        onSuccess: () => {
          reset(), setOpen(false)
        }
      }
    )
  )

  return (
    <>
      <div onClick={handleOpen} style={{ cursor: 'pointer' }}>
        {trigger || (
          <Button variant='contained' className='max-sm:w-full' startIcon={<i className='tabler-plus' />}>
            ثبت دسته‌بندی جدید
          </Button>
        )}
      </div>

      <CustomDialog
        open={open}
        onClose={handleClose}
        title='ثبت دسته‌بندی جدید'
        defaultMaxWidth='xs'
        actions={<FormActions submitText='ثبت' onCancel={handleClose} onSubmit={onSubmit} isLoading={isPending} />}
      >
        <FormProvider {...methods}>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12 }}>
              <Grid container spacing={6}>
                <FormField control={control} errors={errors} name='name' label='عنوان دسته بندی' placeholder='نام دسته بندی را وارد کنید' />
                <FormField control={control} errors={errors} name='slug' label='نامک (Slug)' placeholder='نامک دسته‌بندی را وارد کنید' />
                {!!categories && categories.length > 0 && <CategorySelect control={control} errors={errors} categories={categories} />}
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomDialog>
    </>
  )
}

export default CreateCategoryDialog
