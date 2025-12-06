'use client'

// MUI
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'

// Styles
import tableStyles from '@core/styles/table.module.css'

// Components
import RemoveMaterialStickerModal from './RemoveMaterialStickerModal'
import CreateUpdateMaterialStickerDialog from './CreateUpdateMaterialStickerDialog'

// Types
import { MaterialSticker, SurfaceType } from '@/types/app/material-sticker.type'
import GradientPreview from './GradientPreview'

const surfaceLabel = {
  MATTE: 'مات',
  GLOSSY: 'براق',
  RAINBOW: 'رنگین‌کمانی',
  REFLECTIVE: 'رفلکتیو'
}

const DesktopMaterialStickerTable = ({ data }: { data: MaterialSticker[] }) => {
  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>عنوان</th>
            <th>رنگ</th>
            <th>گرادیان</th>
            <th>جنس متریال</th>
            <th>قیمت هر سانت</th>
            <th>درصد سود</th>
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
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    backgroundColor: row.colorCode
                  }}
                />
              </td>

              <td>
                <GradientPreview row={row} />
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {surfaceLabel[row.surface as SurfaceType]}
                </Typography>
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.pricePerCM?.toLocaleString()} تومان
                </Typography>
              </td>

              <td>
                <Typography className='font-medium' color='text.primary'>
                  {row.profitPercent}%
                </Typography>
              </td>

              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <RemoveMaterialStickerModal id={String(row.id)} />

                  <CreateUpdateMaterialStickerDialog
                    trigger={
                      <IconButton size='small'>
                        <i className='tabler-edit text-gray-500 text-lg' />
                      </IconButton>
                    }
                    materialSticker={row}
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

export default DesktopMaterialStickerTable
