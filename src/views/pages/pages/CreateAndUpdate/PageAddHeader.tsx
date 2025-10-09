import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface PageAddHeaderProps {
  onButtonClick: () => void
  isLoading: boolean
  isUpdate: boolean
}

const PageAddHeader: FC<PageAddHeaderProps> = ({ onButtonClick, isLoading, isUpdate }) => {
  const router = useRouter()

  const handleCancel = () => {
    router.push('/pages')
  }

  return (
    <div className='flex flex-wrap sm:items-center justify-between max-sm:flex-col gap-6'>
      <div>
        <Typography variant='h4' className='mbe-1'>
          {isUpdate ? 'ویرایش برگه' : 'افزودن برگه جدید'}
        </Typography>
      </div>
      <div className='flex flex-wrap max-sm:flex-col gap-4'>
        <Button variant='tonal' color='secondary' type='button' onClick={handleCancel} disabled={isLoading}>
          لغو
        </Button>

        <Button variant='contained' color='primary' type='button' onClick={onButtonClick} disabled={isLoading}>
          {isLoading ? 'در حال ارسال...' : isUpdate ? 'به‌روزرسانی برگه' : 'انتشار برگه'}
        </Button>
      </div>
    </div>
  )
}

export default PageAddHeader
