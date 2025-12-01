'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Type Imports
import { Font } from '@/types/app/font.type'

// Component Imports
import RemoveFontModal from './RemoveFontModal'
import CreateUpdateFontDialog from './CreateUpdateFontDialog'

export type FontForm = {
  id?: string
  name: string
  price: number | null
  estimatedDays: number | null
  isActive: boolean
}

const DesktopFontTable = ({ data }: { data: Font[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>نام روش حمل</th>
            <th>هزینه (تومان)</th>
            <th>مدت زمان تخمینی (روز)</th>
            <th>وضعیت</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.name}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'></Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'></Typography>
              </td>
              <td></td>
              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <RemoveFontModal id={String(row.id)} />

                  <CreateUpdateFontDialog
                    trigger={
                      <IconButton size='small'>
                        <i className='tabler-edit text-gray-500 text-lg' />
                      </IconButton>
                    }
                    font={row}
                  />
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DesktopFontTable
