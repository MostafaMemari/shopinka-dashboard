import { GalleryItem } from '@/types/app/gallery.type'

export const ImageCard = ({ item }: { item: GalleryItem }) => (
  <Box
    sx={{
      position: 'relative',
      width: 120,
      height: 120,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 1
    }}
  >
    <Image src={item.fileUrl} alt={item.title || 'تصویر گالری'} fill style={{ objectFit: 'cover' }} />
    <Tooltip title='حذف تصویر'>
      <IconButton
        size='small'
        color='error'
        onClick={() => handleRemove(item.id)}
        sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'rgba(255,255,255,0.8)', '&:hover': { bgcolor: 'rgba(255,0,0,0.15)' } }}
      >
        <DeleteOutlineIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  </Box>
)
