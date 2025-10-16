'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import Link from 'next/link'
import { BulkPricingItem } from '@/types/app/bulkPricing.type'

// Desktop Table Component
const DesktopBulkPricingTable = ({ data }: { data: BulkPricingItem[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>نام گالری</th>
          <th>توضیحات</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.id}
              </Typography>
            </td>
            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.isGlobal ?? '-'}
              </Typography>
            </td>

            <td>
              <Box display='flex' alignItems='center' gap={2}>
                {/* <RemoveGalleryModal id={String(row.id)} />
                <UpdateGalleryModal gallery={row} /> */}
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DesktopBulkPricingTable
