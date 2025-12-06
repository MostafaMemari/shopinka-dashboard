'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { toggleCommentStatus } from '@/libs/api/comment.api'
import { useFormSubmit } from '@/hooks/useFormSubmit'
import { QueryKeys } from '@/types/enums/query-keys'
import { toggleMaterialStickerDefaultStatus } from '@/libs/api/material-sticker.api'

interface Props {
  id: number
  isDefault: boolean
}

const MaterialStickerIsDefaultToggle = ({ id, isDefault }: Props) => {
  const { isLoading, onSubmit } = useFormSubmit<{ isDefault: boolean }>({
    updateApi: async () => {
      return toggleMaterialStickerDefaultStatus(id.toString(), !isDefault)
    },
    errorMessages: {
      400: 'درخواست نامعتبر است',
      404: 'نظر پیدا نشد',
      500: 'خطای سرور'
    },
    queryKey: QueryKeys.MaterialStickers,
    successMessage: 'وضعیت پیش‌فرض با موفقیت تغییر کرد',
    isUpdate: true,
    initialData: { id: String(id), isDefault },
    noChangeMessage: 'وضعیتی تغییر نکرد'
  })

  const handleToggle = () => {
    onSubmit({ isDefault: !isDefault })
  }

  return (
    <Tooltip title={isDefault ? 'لغو تأیید پیش‌فرض' : 'تأیید پیش‌فرض'}>
      <FormControlLabel control={<Switch size='small' checked={isDefault} onChange={handleToggle} disabled={isLoading} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default MaterialStickerIsDefaultToggle
