'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, Tooltip } from '@mui/material'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Components
import RemoveManitor404Dialog from './RemoveManitor404Dialog'

// Types
import { Manitor404Item } from '@/types/app/manitor-404.type'
import Manitor404DetailsDialog from './DetailManitor404Dialog'

const truncate = (text: string, max = 40) => (text.length > max ? `${text.slice(0, max)}…` : text)

const DesktopManitor404Table = ({ data }: { data: Manitor404Item[] }) => (
  <div className='overflow-x-auto'>
    <table className={tableStyles.table}>
      <thead>
        <tr>
          <th>مسیر</th>
          <th>تعداد</th>
          <th>آخرین بازدید</th>
          <th>عملیات</th>
        </tr>
      </thead>

      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>
              <Tooltip title={row.path} arrow>
                <Typography className='font-medium cursor-help' color='text.primary'>
                  {truncate(row.path, 35)}
                </Typography>
              </Tooltip>
            </td>

            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.hitCount}
              </Typography>
            </td>

            {/* Last Seen */}
            <td>
              <Typography className='font-medium' color='text.primary'>
                {new Date(row.lastSeenAt).toLocaleString('fa-IR')}
              </Typography>
            </td>

            <td>
              <Box display='flex' alignItems='center' gap={1}>
                <Manitor404DetailsDialog item={row} />
                <RemoveManitor404Dialog id={String(row.id)} />
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DesktopManitor404Table
