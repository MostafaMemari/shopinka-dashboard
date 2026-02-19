'use client'

// React Imports
import { useState, useEffect, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Chip from '@mui/material/Chip'
import type { TextFieldProps } from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'
import type { RankingInfo } from '@tanstack/match-sorter-utils'

// Type Imports
import type { ThemeColor } from '@core/types'
import type { Response } from '@/types/response'
import type { Order } from '@/types/app/order.type'

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

// Status colors
const orderStatusMap: { [key: string]: { label: string; color: ThemeColor } } = {
  PROCESSING: { label: 'در حال پردازش', color: 'warning' },
  COMPLETED: { label: 'تکمیل شده', color: 'success' },
  CANCELLED: { label: 'لغو شده', color: 'error' },
  SHIPPED: { label: 'ارسال شده', color: 'info' },
  PENDING: { label: 'در انتظار پرداخت', color: 'primary' }
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

const columnHelper = createColumnHelper<Order>()

const OrderListTableHome = ({ orderData }: { orderData?: any }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Order[]>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(() => {
    setData((orderData as any)?.items ?? (orderData as any)?.data ?? [])
  }, [orderData])

  const columns = useMemo<ColumnDef<Order, any>[]>(
    () => [
      columnHelper.accessor('orderNumber', {
        header: 'شماره سفارش',
        cell: ({ row }) => (
          <Typography component={Link} href={`/orders/${row.original.id}`} color='primary.main' className='font-medium'>
            {row.original.orderNumber}#
          </Typography>
        )
      }),
      columnHelper.accessor('user', {
        header: 'کاربر',
        cell: ({ row }) => (
          <Typography component={Link} href={`/users/${row.original.id}`} color='primary.main' className='font-medium'>
            {row.original.userId}#
          </Typography>
        )
      }),
      columnHelper.accessor('status', {
        header: 'وضعیت',
        cell: ({ row }) => {
          const status = orderStatusMap[row.original.status]

          return <Chip label={status?.label || row.original.status} color={status?.color || 'default'} variant='tonal' size='small' />
        }
      }),
      columnHelper.accessor('createdAt', {
        header: 'تاریخ',
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
    initialState: { pagination: { pageSize: 5 } },
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
      <CardContent className='flex justify-between max-sm:flex-col sm:items-center gap-4'>
        <DebouncedInput value={globalFilter ?? ''} onChange={value => setGlobalFilter(String(value))} placeholder='جستجو سفارش...' className='sm:is-auto' />
        <div className='flex items-center max-sm:flex-col gap-4 max-sm:is-full is-auto'>
          <CustomTextField select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))} className='is-[70px] max-sm:is-full'>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </CustomTextField>
        </div>
      </CardContent>

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
                  سفارشی یافت نشد
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

export default OrderListTableHome
