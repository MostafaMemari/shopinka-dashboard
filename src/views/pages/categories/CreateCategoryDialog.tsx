'use client'

import { useState, useCallback, ReactNode } from 'react'
import Button from '@mui/material/Button'
import CustomDialog from '@/components/dialogs/CustomDialog'
import FormActions from '@/components/FormActions'
import { useCategoryForm } from '@/hooks/reactQuery/useCategory'
import { CategoryFormType, categoryFormSchema } from '@/libs/validators/category.schema'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Grid from '@mui/material/Grid2'
import { CategoryType } from '@/types/app/category.type'
import FormField from '@/components/form/FormField'

interface Props {
  trigger?: ReactNode
  type: CategoryType
}

const CreateCategoryDialog = ({ trigger, type }: Props) => {
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
              </Grid>
            </Grid>
          </Grid>
        </FormProvider>
      </CustomDialog>
    </>
  )
}

export default CreateCategoryDialog
