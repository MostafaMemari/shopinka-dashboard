'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import { Box, IconButton } from '@mui/material'

// Component Imports

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// API Import
import { Gallery } from '@/types/app/gallery.type'
import Link from 'next/link'
import RemoveGalleryDialog from './RemoveGalleryDialog'
import CreateUpdateGalleryDialog from './CreateUpdateGalleryDialog'

// Desktop Table Component
const DesktopGalleryTable = ({ data }: { data: Gallery[] }) => (
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
                {row.title}
              </Typography>
            </td>
            <td>
              <Typography className='font-medium' color='text.primary'>
                {row.description ?? '-'}
              </Typography>
            </td>

            <td>
              <Box display='flex' alignItems='center' gap={2}>
                <RemoveGalleryDialog id={String(row.id)} />
                <CreateUpdateGalleryDialog
                  gallery={row}
                  trigger={
                    <IconButton size='small'>
                      <i className='tabler-edit text-gray-500 text-lg' />
                    </IconButton>
                  }
                />
                <Link href={`/media/${row.id}`}>
                  <IconButton size='small'>
                    <i className='tabler-eye text-gray-500 text-lg' />
                  </IconButton>
                </Link>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default DesktopGalleryTable
