'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { useSetDefaultFontMutation } from '@/hooks/reactQuery/font/useMutationFont'

interface Props {
  id: number
  isDefault: boolean
}

const FontisDefaultToggle = ({ id, isDefault }: Props) => {
  const { mutate: toggleDefault, isPending } = useSetDefaultFontMutation()

  const handleToggle = () => toggleDefault(id)

  return (
    <Tooltip title={isDefault ? 'لغو تأیید پیش‌فرض' : 'تأیید پیش‌فرض'}>
      <FormControlLabel control={<Switch size='small' checked={isDefault} onChange={handleToggle} disabled={isPending} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default FontisDefaultToggle
