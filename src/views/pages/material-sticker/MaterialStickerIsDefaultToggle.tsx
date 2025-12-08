'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { useSetDefaultMaterialStickerMutation } from '@/hooks/reactQuery/material-sticker/useMutationMaterialSticker'

interface Props {
  id: number
  isDefault: boolean
}

const MaterialStickerIsDefaultToggle = ({ id, isDefault }: Props) => {
  const { mutate: toggleDefault, isPending } = useSetDefaultMaterialStickerMutation()

  const handleToggle = () => toggleDefault(id)

  return (
    <Tooltip title={isDefault ? 'لغو تأیید پیش‌فرض' : 'تأیید پیش‌فرض'}>
      <FormControlLabel control={<Switch size='small' checked={isDefault} onChange={handleToggle} disabled={isPending} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default MaterialStickerIsDefaultToggle
