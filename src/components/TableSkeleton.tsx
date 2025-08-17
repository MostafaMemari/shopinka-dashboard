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
        <Skeleton variant='rounded' width='100%' height={50} />
        <Skeleton variant='rounded' width='100%' height={50} />
        <Skeleton variant='rounded' width='100%' height={50} />
        <Skeleton variant='rounded' width='100%' height={50} />
        <Skeleton variant='rounded' width='100%' height={50} />
      </Box>
    </Box>
  )
}
