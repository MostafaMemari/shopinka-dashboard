import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Checkbox from '@mui/material/Checkbox'
import UpdateGalleryItemModal from './UpdateGalleryItemModal'
import DetailMediaModal from './DetailMediaModal'
import { GalleryItem } from '@/types/app/galleryItem.type'

interface MediaGridProps {
  data: GalleryItem[]
  selected: string[]
  handleCheckboxChange: (id: string) => void
}

const MediaGrid = ({ data, selected, handleCheckboxChange }: MediaGridProps) => {
  return (
    <div className='p-6'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
        {data.map(item => {
          const id = String(item.id)
          const isChecked = selected.includes(id)

          const commonBorderClass = isChecked ? 'border-4 border-blue-500' : 'border-none'

          return (
            <div key={id} className='relative'>
              <Box sx={{ position: 'absolute', top: 8, left: 8, zIndex: 2, display: 'flex', gap: 1 }}>
                <Checkbox checked={isChecked} onChange={() => handleCheckboxChange(id)} size='small' />
                <UpdateGalleryItemModal initialData={{ title: item.title, description: item.description }} galleryItemId={id} />
                <DetailMediaModal file={item} />
              </Box>

              <div className={`relative w-full h-48 rounded-lg overflow-hidden cursor-pointer ${commonBorderClass}`} onClick={() => handleCheckboxChange(id)}>
                {item.mimetype.startsWith('image/') ? (
                  <Image
                    src={item.fileUrl}
                    alt={item.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw'
                  />
                ) : (
                  <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'background.default' }}>
                    <Typography variant='body2' color='text.secondary'>
                      {item.title}
                    </Typography>
                  </Box>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MediaGrid
