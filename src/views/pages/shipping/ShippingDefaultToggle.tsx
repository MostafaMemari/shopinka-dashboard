'use client'

import { FormControlLabel, Switch, Tooltip } from '@mui/material'
import { useSetDefaultShippingMutation } from '@/hooks/reactQuery/shipping/useMutationShipping'

interface Props {
  id: number
  isDefault: boolean
}

const ShippingDefaultToggle = ({ id, isDefault }: Props) => {
  const { mutate: toggleDefault, isPending } = useSetDefaultShippingMutation()

  const handleToggle = () => toggleDefault(id)

  return (
    <Tooltip title={isDefault ? 'لغو تأیید پیش‌فرض' : 'تأیید پیش‌فرض'}>
      <FormControlLabel control={<Switch size='small' checked={isDefault} onChange={handleToggle} disabled={isPending} />} label='' sx={{ margin: 0 }} />
    </Tooltip>
  )
}

export default ShippingDefaultToggle
