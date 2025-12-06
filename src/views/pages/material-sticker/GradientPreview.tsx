import { useState } from 'react'
import { Box, Modal } from '@mui/material'
import { MaterialSticker } from '@/types/app/material-sticker.type'

const GradientPreview = ({ row }: { row: MaterialSticker }) => {
  const [open, setOpen] = useState(false)

  const gradient = `linear-gradient(to bottom right, ${row.backgroundFrom}, ${row.backgroundTo})`

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          width: 40,
          height: 40,
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        className='relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '8px',
            background: gradient,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            height: '70vh'
          }}
        >
          <div className='relative w-full h-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center'>
            <div
              className='absolute inset-0 rounded-2xl pointer-events-none touch-action-none shadow-2xl overflow-hidden'
              style={{
                background: gradient,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)'
              }}
            >
              <div className='absolute inset-0 bg-white/5 rounded-2xl' />
              <div className='absolute inset-0 opacity-10 rounded-2xl'>
                <div className='w-full h-full bg-grid-pattern' />
              </div>
            </div>

            <p
              className='relative z-10 text-center font-bold'
              style={{
                color: row.colorCode,
                fontSize: 'clamp(2rem, 4vw, 5rem)'
              }}
            >
              متن تستی
            </p>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default GradientPreview
