import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import GalleryItemForm from './GalleryItemForm'
import { GalleryItem } from '@/types/app/galleryItem.type'

interface Props {
  activeItem: GalleryItem | null
  multi: boolean
  selectedItems: GalleryItem[]
}

const GalleryItemDetails = ({ activeItem, multi, selectedItems }: Props) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: 300 },
        borderLeft: '1px solid',
        borderColor: 'divider',
        p: { xs: 2, sm: 4 },
        overflowY: 'auto',
        maxHeight: '100%',
        bgcolor: 'background.paper'
      }}
    >
      <Typography variant='h6'>جزئیات تصویر</Typography>
      {activeItem ? (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <GalleryItemForm activeItem={activeItem} />

          <Typography variant='body2'>
            <strong>شناسه:</strong> {activeItem.id}
          </Typography>
          <Typography variant='body2'>
            <strong>تاریخ ایجاد:</strong> {new Date(activeItem.createdAt).toLocaleDateString('fa-IR')}
          </Typography>
          <Typography variant='body2'>
            <strong>حجم:</strong> {(activeItem.size / 1024).toFixed(2)} KB
          </Typography>
          <Typography variant='body2'>
            <strong>نوع فایل:</strong> {activeItem.mimetype}
          </Typography>
          <Typography variant='body2'>
            <strong>آدرس فایل:</strong>{' '}
            <a href={activeItem.fileUrl} target='_blank' rel='noopener noreferrer'>
              لینک
            </a>
          </Typography>
        </Box>
      ) : (
        <Typography variant='body2' sx={{ mt: 2 }}>
          هیچ آیتمی انتخاب نشده است
        </Typography>
      )}
      {multi && selectedItems.length > 0 && (
        <Typography variant='body2' sx={{ mt: 2 }}>
          {selectedItems.length} تصویر انتخاب شده
        </Typography>
      )}
    </Box>
  )
}

export default GalleryItemDetails
