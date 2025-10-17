'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Badge, Box, IconButton } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Type Imports
import { BulkPricingItem } from '@/types/app/bulkPricing.type'
import CreateUpdateBulkPricingDIalog from './CreateUpdateBulkPricingDIalog'
import RemoveBulkPricingDialog from './RemoveBulkPricingDialog'

// Desktop Table Component
const DesktopBulkPricingTable = ({ data }: { data: BulkPricingItem[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>حداقل تعداد</th>
          <th>تخفیف</th>
          <th>نوع تخفیف</th>
          <th>عمومی</th>
          <th>عملیات</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.minQty}
              </Typography>
            </td>

            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.discount}%
              </Typography>
            </td>

            <td>
              <Badge badgeContent={row.type === 'PERCENT' ? 'درصدی' : row.type === 'FIXED' ? 'ثابت' : ''} color={row.type === 'PERCENT' ? 'primary' : 'secondary'} />
            </td>

            <td>
              <Badge badgeContent={row.isGlobal ? 'سراسری' : 'محصول'} color={row.isGlobal ? 'primary' : 'secondary'} />
            </td>

            <td>
              <Box display='flex' alignItems='center' gap={1}>
                {/* <EditBulkPricingModal data={row} /> */}

                <CreateUpdateBulkPricingDIalog
                  bulkPricing={row}
                  trigger={
                    <IconButton size='small'>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  }
                />
                <RemoveBulkPricingDialog id={String(row.id)} />
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DesktopBulkPricingTable
