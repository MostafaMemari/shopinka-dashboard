'use client'

import { useQueryState } from 'nuqs'
import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from '@/@core/components/mui/TextField'
import { type Theme, useMediaQuery } from '@mui/material'
import { Pager } from '@/types/response'

type SimplePaginationProps = {
  pager: Pager
}

const SimplePagination = ({ pager }: SimplePaginationProps) => {
  const { currentPage, totalPages, totalCount } = pager

  const [page, setPage] = useQueryState('page', {
    defaultValue: currentPage,
    parse: Number,
    serialize: String,
    history: 'replace',
    scroll: true,
    shallow: false
  })

  const [rowsPerPage, setRowsPerPage] = useQueryState('take', {
    defaultValue: 10,
    parse: Number,
    serialize: String,
    history: 'replace',
    scroll: true,
    shallow: false
  })

  const from = totalCount === 0 ? 0 : (page - 1) * rowsPerPage + 1
  const to = Math.min(page * rowsPerPage, totalCount)

  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>{`نمایش ${from} تا ${to} از ${totalCount} مورد`}</Typography>

      <div className='flex items-center gap-2 max-sm:flex-col sm:flex-row'>
        <div className='flex items-center gap-2'>
          <Typography className='text-sm text-gray-600 whitespace-nowrap'>تعداد در صفحه:</Typography>
          <CustomTextField
            select
            value={rowsPerPage}
            onChange={e => {
              setRowsPerPage(Number(e.target.value))
              setPage(1)
            }}
            className='flex-auto max-sm:w-full sm:w-[70px]'
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </CustomTextField>
        </div>

        <Pagination
          size={isSmall ? 'small' : 'medium'}
          shape='rounded'
          color='primary'
          variant='tonal'
          count={totalPages}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          showFirstButton
          showLastButton
          disabled={totalCount === 0}
        />
      </div>
    </div>
  )
}

export default SimplePagination
