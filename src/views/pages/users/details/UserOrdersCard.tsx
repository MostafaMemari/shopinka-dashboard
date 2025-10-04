'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import type { ColumnDef, FilterFn } from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import { Order, ORDER_STATUS_MAP } from '@/types/app/order.type'
import classNames from 'classnames'
import Link from 'next/link'
import { TRANSACTION_STATUS_MAP } from '@/types/app/transaction.type'
import { Chip } from '@mui/material'
import TablePagination from '@mui/material/TablePagination'
import TablePaginationComponentReactTable from '@/components/TablePaginationComponentReactTable'

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// Column Definitions
const columnHelper = createColumnHelper<Order>()

const OrderTable = ({ orders }: { orders: Order[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[orders])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<Order, any>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('id', {
        header: 'شناسه',
        cell: ({ row }) => <Link className='text-sky-300 dark:text-sky-600' href={`/orders/${row.original.id}`}>{`#${row.original.id}`}</Link>
      }),
      columnHelper.accessor('orderNumber', {
        header: 'شماره سفارش',
        cell: ({ row }) => <Typography>{`${row.original.orderNumber}`}</Typography>
      }),
      columnHelper.accessor('status', {
        header: 'وضعیت سفارش',
        cell: ({ row }) => {
          const orderStatus = row.original.status ? ORDER_STATUS_MAP[row.original.status] || ORDER_STATUS_MAP.UNKNOWN : ORDER_STATUS_MAP.UNKNOWN

          return <Chip label={orderStatus.label} color={orderStatus.color} size='small' />
        }
      }),
      columnHelper.accessor('transaction.status', {
        header: 'وضعیت پرداخت',
        cell: ({ row }) => {
          const transactionStatus = row.original.transaction?.status
            ? TRANSACTION_STATUS_MAP[row.original.transaction.status as keyof typeof TRANSACTION_STATUS_MAP] || TRANSACTION_STATUS_MAP.UNKNOWN
            : TRANSACTION_STATUS_MAP.UNKNOWN

          return <Chip label={transactionStatus.label} color={transactionStatus.color} size='small' />
        }
      }),

      columnHelper.accessor('transaction.amount', {
        header: 'مبلغ پرداختی',
        cell: ({ row }) => <Typography>{`${Number(row.original.transaction?.amount) / 10} تومان`}</Typography>
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as Order[],
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    globalFilterFn: fuzzyFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <div className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        className={classNames({
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
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {table.getFilteredRowModel().rows.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                هیچ سفارشی یافت نشد
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className='border-be'>
            {table
              .getRowModel()
              .rows.slice(0, table.getState().pagination.pageSize)
              .map(row => {
                return (
                  <tr key={row.id} className={classNames({ selected: row.getIsSelected() })}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    ))}
                  </tr>
                )
              })}
          </tbody>
        )}
      </table>

      <TablePagination
        component={() => <TablePaginationComponentReactTable table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </div>
  )
}

const UserOrdersCard = ({ orders }: { orders: Order[] }) => {
  return (
    <Card>
      <CardHeader title='سفارشات' />
      <OrderTable orders={orders} />
    </Card>
  )
}

export default UserOrdersCard
