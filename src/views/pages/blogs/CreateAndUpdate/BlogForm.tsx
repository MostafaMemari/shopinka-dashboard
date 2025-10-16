'use client'

import { FormProvider } from 'react-hook-form'
import Grid from '@mui/material/Grid2'
import LoadingSpinner from '@/components/LoadingSpinner'
import BlogFormTabs from './BlogFormTabs'
import BlogAddHeader from './sections/BlogAddHeader'
import { useRouter } from 'next/navigation'
import { useBlogFormSubmit } from '@/hooks/reactQuery/blog/useBlogFormSubmit'
import { useBlogFormFields } from '@/hooks/reactQuery/blog/useBlogFormFields'
import { Blog, BlogStatus } from '@/types/app/blog.type'
import { BlogProvider } from './BlogContext'

const BlogForm = ({ blog }: { blog?: Blog }) => {
  const { isLoading, onSubmit } = useBlogFormSubmit({ initialData: blog })
  const { methods } = useBlogFormFields({ initialData: blog })

  const router = useRouter()

  const handleHeaderButtonClick = (buttonType: 'cancel' | 'draft' | 'publish') => {
    switch (buttonType) {
      case 'cancel':
        router.push('/blogs')
        break
      case 'draft':
        methods.setValue('status', BlogStatus.DRAFT)
        methods.handleSubmit(onSubmit)()

        break
      case 'publish':
        methods.setValue('status', BlogStatus.PUBLISHED)
        methods.handleSubmit(onSubmit)()

        break
    }
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <BlogProvider blog={blog}>
      <FormProvider {...methods}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12 }}>
            <BlogAddHeader isUpdate={!!blog} isLoading={isLoading} onButtonClick={handleHeaderButtonClick} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <BlogFormTabs />
          </Grid>
        </Grid>
      </FormProvider>
    </BlogProvider>
  )
}

export default BlogForm
