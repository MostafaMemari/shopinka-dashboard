'use client'

import FormField from '@/components/form/FormField'

interface GalleryFormProps {
  onSubmit?: () => void
}

const GalleryForm = ({ onSubmit }: GalleryFormProps) => {
  return (
    <form onSubmit={onSubmit} id='gallery-form' className='flex flex-col gap-5'>
      <FormField name='title' label='نام گالری' placeholder='لطفا نام گالری را وارد کنید' />

      <FormField name='description' label='توضیحات' placeholder='لطفا توضیحات گالری را وارد کنید' rows={4} />
    </form>
  )
}

export default GalleryForm
