'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// Component Imports
import { useTags } from '@/hooks/reactQuery/useTag'
import { Tag } from '@/types/app/tag.type'
import CreateTagModal from '@/views/pages/tags/CreateTagModal'
import FormField from '@/components/form/FormField'

const ProductTags = ({ initialTagIds }: { initialTagIds?: number[] }) => {
  const { data, isLoading, isFetching, error } = useTags({
    enabled: true,
    params: { take: 200, type: 'PRODUCT', includeThumbnailImage: true },
    staleTime: 5 * 60 * 1000
  })

  const tags: Tag[] = useMemo(() => data?.data?.items || [], [data])

  return (
    <Card>
      <CardHeader title='برچسب‌ها' />
      <CardContent>
        <FormField
          type='multiselect'
          name='tagIds'
          label='انتخاب برچسب'
          placeholder='برچسب‌ها را انتخاب کنید'
          defaultValue={initialTagIds}
          options={
            tags.map((tag: Tag) => ({
              label: tag.name,
              value: tag.id
            })) || []
          }
        />

        {(isLoading || isFetching) && <Typography sx={{ mt: 2 }}>در حال بارگذاری...</Typography>}
        {error && (
          <Typography color='error' sx={{ mt: 2 }}>
            خطا در بارگذاری برچسب‌ها
          </Typography>
        )}
        {!isLoading && !isFetching && tags.length === 0 && <Typography sx={{ mt: 2 }}>برچسبی یافت نشد</Typography>}

        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 3 }}>
          <CreateTagModal>
            <Typography variant='body2' color='primary' sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>
              ثبت برچسب جدید
            </Typography>
          </CreateTagModal>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProductTags
