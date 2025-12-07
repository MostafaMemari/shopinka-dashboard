'use client'

import { Box, IconButton, Typography } from '@mui/material'
import GradientPreview from './GradientPreview'
import MaterialStickerIsDefaultToggle from './MaterialStickerIsDefaultToggle'
import RemoveMaterialStickerModal from './RemoveMaterialStickerModal'
import CreateUpdateMaterialStickerDialog from './CreateUpdateMaterialStickerDialog'
import tableStyles from '@core/styles/table.module.css'
import { MaterialSticker, SurfaceType } from '@/types/app/material-sticker.type'
import { useMaterialStickerReorder } from '@/hooks/reactQuery/material-sticker/useMutationMaterialSticker'
import MoveButtons from './MoveButtons'

interface DesktopMaterialStickerTableProps {
  data: MaterialSticker[]
}

const surfaceLabel: Record<SurfaceType, string> = {
  MATTE: 'مات',
  GLOSSY: 'براق',
  RAINBOW: 'رنگین‌کمانی',
  REFLECTIVE: 'رفلکتیو'
}

const DesktopMaterialStickerTable = ({ data }: DesktopMaterialStickerTableProps) => {
  const { rows, moveUp, moveDown } = useMaterialStickerReorder(data)

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
            <th>ترتیب</th>
            <th>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {rows.map(row => (
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
                <MoveButtons onMoveUp={() => moveUp(row.id)} onMoveDown={() => moveDown(row.id)} />
              </td>
              <td>
                <Box display='flex' alignItems='center' gap={2}>
                  <MaterialStickerIsDefaultToggle id={row.id} isDefault={row.isDefault} />
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
