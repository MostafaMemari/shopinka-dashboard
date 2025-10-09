'use client'

import { Box, Chip, IconButton, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import RemoveTagModal from './RemoveTagModal'
import { stripHtml, truncateText } from '@/utils/formatters'
import { Tag } from '@/types/app/tag.type'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const DesktopTagTable = ({ tags }: { tags: Tag[] }) => {
  const router = useRouter()

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>نام تگ</th>
            <th>نامک تگ</th>
            <th>نوع تگ</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {tags.length === 0 ? (
            <tr>
              <td colSpan={5} className='text-center'>
                هیچ تگی یافت نشد
              </td>
            </tr>
          ) : (
            tags.map(tag => (
              <tr key={tag.id}>
                <td>
                  {tag.thumbnailImageId && tag.thumbnailImage?.thumbnailUrl ? (
                    <Image
                      src={tag.thumbnailImage.thumbnailUrl}
                      alt={tag.name || 'تصویر تگ'}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <Typography color='text.secondary'>-</Typography>
                  )}
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {tag.name || '-'}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {tag.slug || '-'}
                  </Typography>
                </td>
                <td>
                  <Chip label={tag.type === 'PRODUCT' ? 'محصول' : 'وبلاگ'} color={tag.type === 'PRODUCT' ? 'primary' : 'success'} size='small' variant='outlined' />
                </td>
                <td>
                  <Box display='flex' alignItems='center' gap={2}>
                    <RemoveTagModal id={tag.id}>
                      <IconButton size='small'>
                        <i className='tabler-trash text-gray-500 text-lg' />
                      </IconButton>
                    </RemoveTagModal>
                    <IconButton onClick={() => router.push(`/tags/edit?id=${tag.id}`)} size='small'>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  </Box>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopTagTable
