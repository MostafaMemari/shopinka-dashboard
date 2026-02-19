'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import TablePaginationComponentReactTable from '@/components/TablePaginationComponentReactTable'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

type Sticker = {
  id: number
  name: string
  userId: number
  finalPrice: number
  status: string
  createdAt: string
  font: { displayName: string }
  material: { name: string; colorCode: string }
  previewImage: { thumbnailUrl: string }
}

const statusMap: { [key: string]: { label: string; color: any } } = {
  PENDING: { label: 'در انتظار', color: 'warning' },
  PROCESSING: { label: 'در حال پردازش', color: 'info' },
  COMPLETED: { label: 'تکمیل شده', color: 'success' },
  CANCELLED: { label: 'لغو شده', color: 'error' }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<TextFieldProps, 'onChange'>) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)

    return () => clearTimeout(timeout)
  }, [value, onChange, debounce])

  return <CustomTextField {...(props as any)} value={value} onChange={e => setValue(e.target.value)} />
}

const columnHelper = createColumnHelper<Sticker>()

const StickerListTable = ({ stickerData }: { stickerData?: any }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Sticker[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    let items: Sticker[] = []

    if (Array.isArray(stickerData)) {
      items = stickerData
    } else if (stickerData?.data?.items) {
      items = stickerData.data.items
    } else if (stickerData?.items) {
      items = stickerData.items
    }

    setData(items)
  }, [stickerData])

  const columns = useMemo<ColumnDef<Sticker, any>[]>(
    () => [
      columnHelper.accessor('previewImage', {
        header: 'پیش‌نمایش',
        cell: ({ row }) => (
          <img src={row.original.previewImage?.thumbnailUrl} alt={row.original.name} className='w-14 h-14 object-cover rounded-lg border border-divider shadow-sm' />
        )
      }),

      columnHelper.accessor('name', {
        header: 'نام برچسب',
        cell: ({ row }) => (
          <Typography component={Link} href={`/stickers/${row.original.id}`} color='primary.main' className='font-medium hover:underline'>
            {row.original.name}
          </Typography>
        )
      }),

      columnHelper.accessor('font', {
        header: 'فونت',
        cell: ({ row }) => <Typography>{row.original.font?.displayName || '—'}</Typography>
      }),

      columnHelper.accessor('material', {
        header: 'متریال',
        cell: ({ row }) => (
          <div className='flex items-center gap-2'>
            <div className='w-5 h-5 rounded-full border border-divider shadow-sm' style={{ backgroundColor: row.original.material?.colorCode }} />
            <Typography>{row.original.material?.name || '—'}</Typography>
          </div>
        )
      }),

      columnHelper.accessor('finalPrice', {
        header: 'قیمت',
        cell: ({ row }) => <Typography className='font-medium'>{row.original.finalPrice.toLocaleString('fa-IR')} تومان</Typography>
      }),

      columnHelper.accessor('status', {
        header: 'وضعیت',
        cell: ({ row }) => {
          const s = statusMap[row.original.status] || { label: row.original.status, color: 'default' }

          return <Chip label={s.label} color={s.color} variant='tonal' size='small' />
        }
      }),

      columnHelper.accessor('createdAt', {
        header: 'تاریخ ثبت',
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt)

          return (
            <Typography variant='body2'>
              {date.toLocaleDateString('fa-IR')} - {date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          )
        }
      })
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { rowSelection, globalFilter },
    initialState: { pagination: { pageSize: 10 } },
    enableRowSelection: true,
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <Card>
      <CardHeader title='برچسب‌های سفارشی' />

      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl' />,
                          desc: <i className='tabler-chevron-down text-xl' />
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center py-10'>
                  برچسبی یافت نشد
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <TablePaginationComponentReactTable table={table} />
    </Card>
  )
}

export default StickerListTable
