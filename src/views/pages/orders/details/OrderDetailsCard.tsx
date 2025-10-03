'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
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

// Component Imports
import Link from '@components/Link'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

import { type OrderDetails, type OrderMappedItem } from '@/types/app/order.type'
import { mappedOrderItem } from '@/utils/mappedOrderItem'
import classNames from 'classnames'
import { Box, Button } from '@mui/material'

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

// type dataType = {
//   productName: string
//   productImage: string
//   brand: string
//   price: number
//   quantity: number
//   total: number
// }

// const orderData: dataType[] = [
//   {
//     productName: 'OnePlus 7 Pro',
//     productImage: '/images/apps/ecommerce/product-21.png',
//     brand: 'OnePluse',
//     price: 799,
//     quantity: 1,
//     total: 799
//   },
//   {
//     productName: 'Magic Mouse',
//     productImage: '/images/apps/ecommerce/product-22.png',
//     brand: 'Google',
//     price: 89,
//     quantity: 1,
//     total: 89
//   },
//   {
//     productName: 'Wooden Chair',
//     productImage: '/images/apps/ecommerce/product-23.png',
//     brand: 'Insofar',
//     price: 289,
//     quantity: 2,
//     total: 578
//   },
//   {
//     productName: 'Air Jorden',
//     productImage: '/images/apps/ecommerce/product-24.png',
//     brand: 'Nike',
//     price: 299,
//     quantity: 2,
//     total: 598
//   }
// ]

// Column Definitions
const columnHelper = createColumnHelper<OrderMappedItem>()

const OrderTable = ({ orderItems }: { orderItems: OrderMappedItem[] }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(...[orderItems])
  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<OrderMappedItem, any>[]>(
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
      columnHelper.accessor('title', {
        header: 'نام محصول',
        cell: ({ row }) => (
          <div className='flex items-center gap-3'>
            <img src={row.original.thumbnail} alt={row.original.thumbnail} height={34} className='rounded' />
            <div className='flex flex-col items-start'>
              <Typography color='text.primary' className='font-medium'>
                {row.original.title}
              </Typography>
              <Box display='flex' alignItems='center' gap={2}>
                {row.original.attributeValues?.map(att => {
                  if (att.colorCode) {
                    return (
                      <Box key={`color-${att.id}`} display='flex' alignItems='center' gap={0.5}>
                        <i className='tabler-circle-filled bs-2.5 is-2.5' style={{ color: att.colorCode }} />
                        <Typography variant='body2' fontSize='0.8rem'>
                          {att.name}
                        </Typography>
                      </Box>
                    )
                  }

                  if (att.buttonLabel) {
                    return (
                      <Box key={`label-${att.id}`} display='flex' alignItems='center' gap={0.5}>
                        <Typography variant='body2' fontSize='0.8rem'>
                          {att.name}
                        </Typography>
                      </Box>
                    )
                  }

                  return null
                })}
              </Box>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('salePrice', {
        header: 'قیمت',
        cell: ({ row }) => <Typography>{`${row.original.salePrice || row.original.basePrice}`}</Typography>
      }),
      columnHelper.accessor('count', {
        header: 'تعداد',
        cell: ({ row }) => <Typography>{`${row.original.count}`}</Typography>
      }),
      columnHelper.accessor('totalPrice', {
        header: 'جمع کل',
        cell: ({ row }) => <Typography>{`${row.original.totalPrice}`}</Typography>
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data: data as OrderMappedItem[],
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
                No data available
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
    </div>
  )
}

const OrderDetailsCard = ({ order }: { order: OrderDetails }) => {
  const orderItems = mappedOrderItem(order.items)
  const totalSum = orderItems.reduce((sum, item) => sum + (item.totalPrice || 0), 0)

  return (
    <Card>
      <CardHeader
        title='جزئیات سفارش'
        action={
          <Box display='flex' alignItems='center' gap={2}>
            <Typography component={Link} color='error.main' className='font-medium'>
              لغو سفارش
            </Typography>
            <Typography component={Link} color='primary.main' className='font-medium'>
              ویرایش
            </Typography>
          </Box>

          // <>
          //   <Box display='flex' alignItems='center' gap={2}>
          //     <Button variant='contained' color='error'>
          //       لغو سفارش
          //     </Button>
          //     <Button variant='contained'>تحویل داده شد</Button>
          //   </Box>
          // </>
        }
      />
      <OrderTable orderItems={orderItems} />
      <CardContent className='flex justify-start'>
        <div className='flex flex-col gap-2'>
          {[
            { label: 'مجموع فروش', value: `${totalSum} تومان` },
            { label: 'هزینه ارسال', value: `${order.totalPrice - totalSum} تومان` },
            { label: 'مجموع پرداختی', value: `${order.totalPrice} تومان` }
          ].map((item, idx) => (
            <div key={idx} className='flex items-center gap-12'>
              <Typography color='text.primary' className='min-w-[100px]'>
                {item.label} :
              </Typography>
              <Typography color='text.primary' className='font-medium'>
                {item.value}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default OrderDetailsCard
