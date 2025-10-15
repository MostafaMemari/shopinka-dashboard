import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface Props {
  onButtonClick: () => void
  isLoading: boolean
  isUpdate: boolean
}

const CategoryHeader: FC<Props> = ({ onButtonClick, isLoading, isUpdate }) => {
  const router = useRouter()

  const handleCancel = () => {
    router.push('/categories')
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {isUpdate ? 'ویرایش دسته بندی' : 'افزودن دسته بندی جدید'}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' type='button' onClick={handleCancel} disabled={isLoading}>
          لغو
        </Button>

        <Button variant='contained' color='primary' type='button' onClick={onButtonClick} disabled={isLoading}>
          {isLoading ? 'در حال ارسال...' : isUpdate ? 'به‌روزرسانی دسته بندی' : 'انتشار دسته بندی'}
        </Button>
      </div>
    </div>
  )
}

export default CategoryHeader
