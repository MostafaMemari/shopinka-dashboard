import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'

export const MobileCardSkeleton = () => (
  <Box className='grid grid-cols-1 gap-4'>
    {[...Array(3)].map((_, i) => (
      <Box key={i}>
        <Skeleton variant='rectangular' height={180} sx={{ borderRadius: 1 }} />
      </Box>
    ))}
  </Box>
)

export const TableListSkeleton = () => {
  return (
    <Box className='flex justify-between flex-col items-start md:flex-row md:items-center p-6 gap-4'>
      <Box className='flex flex-col items-start gap-4 w-full'>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant='rounded' width='100%' height={50} />
        ))}
      </Box>
    </Box>
  )
}

export const GalleryItemSkeleton = () => {
  return (
    <Box className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 m-6'>
      {[...Array(5)].map((_, i) => (
        <Box key={i} className='relative'>
          <Skeleton variant='rounded' className='w-full h-48 rounded-lg' sx={{ aspectRatio: '1/1' }} />
        </Box>
      ))}
    </Box>
  )
}
