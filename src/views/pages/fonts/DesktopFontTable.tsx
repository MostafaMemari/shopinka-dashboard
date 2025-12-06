'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, IconButton, Chip, Avatar } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Type Imports
import { Font } from '@/types/app/font.type'

// Component Imports
import RemoveFontModal from './RemoveFontModal'
import CreateUpdateFontDialog from './CreateUpdateFontDialog'
import FontisDefaultToggle from './FontisDefaultToggle'

const DesktopFontTable = ({ data }: { data: Font[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>تصویر</th>
            <th>فونت</th>
            <th>نام نمایشی</th>
            <th>سایز</th>
            <th>فاصله خطوط</th>
            <th>زبان</th>
            <th>سختی کار</th>
            <th>حجم فونت</th>
            <th>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>
                <img src={row.thumbnail?.fileUrl} alt={row.displayName} style={{ width: '50px', height: '50px', display: 'block' }} />
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.name}
                </Typography>
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.displayName}
                </Typography>
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.size}
                </Typography>
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.lineHeight}
                </Typography>
              </td>

              <td>{row.isPersian ? <Chip label='فارسی' color='success' size='small' /> : <Chip label='لاتین' color='default' size='small' />}</td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.difficultyRatio}
                </Typography>
              </td>
              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.file?.size ? `${(row.file.size / 1024).toFixed(2)} KB` : '-'}
                </Typography>
              </td>

              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <FontisDefaultToggle id={row.id} isDefault={row.isDefault} />

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
