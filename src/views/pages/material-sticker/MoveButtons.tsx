'use client'

import { Box, IconButton } from '@mui/material'

interface MoveButtonsProps {
  onMoveUp: () => void
  onMoveDown: () => void
}

const MoveButtons = ({ onMoveUp, onMoveDown }: MoveButtonsProps) => (
  <Box display='flex' gap={1}>
    <IconButton size='small' onClick={onMoveUp}>
      <i className='tabler-arrow-up text-gray-600 text-xl' />
    </IconButton>
    <IconButton size='small' onClick={onMoveDown}>
      <i className='tabler-arrow-down text-gray-600 text-xl' />
    </IconButton>
  </Box>
)

export default MoveButtons
