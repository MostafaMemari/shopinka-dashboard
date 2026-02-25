'use client'

// React Imports
import { useState, useMemo } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import classNames from 'classnames'

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
import TablePaginationComponentReactTable from '@/components/TablePaginationComponentReactTable'

// Types
interface CartItem {
  id: number
  quantity: number
  product?: any
  productVariant?: any
  customSticker?: any
}

interface Cart {
  id: number
  items: CartItem[]
}

// Helper Functions
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)

  addMeta({ itemRank })

  return itemRank.passed
}

const formatPrice = (price: number | null | undefined): string => {
  if (!price) return '—'

  return `${(price / 10).toLocaleString('fa-IR')} تومان`
}

const getItemName = (item: CartItem): string => {
  if (item.product) return item.product.name || `محصول #${item.product.id}`
  if (item.productVariant) return `واریانت محصول #${item.productVariant.productId || item.productVariant.id}`

  if (item.customSticker) {
    const name = item.customSticker.name || item.customSticker.description || 'استیکر سفارشی'
    const linesText = item.customSticker.lines?.map((l: any) => l.text).join(' - ') || ''

    return linesText ? `${name} (${linesText})` : name
  }

  return 'نامشخص'
}

const getItemType = (item: CartItem): string => {
  if (item.product) return 'محصول ساده'
  if (item.productVariant) return 'واریانت محصول'
  if (item.customSticker) return 'استیکر سفارشی'

  return 'نامشخص'
}

const getItemPrice = (item: CartItem): number => {
  if (item.product) return item.product.salePrice || item.product.basePrice || 0
  if (item.productVariant) return item.productVariant.salePrice || item.productVariant.basePrice || 0
  if (item.customSticker) return item.customSticker.finalPrice || 0

  return 0
}

const columnHelper = createColumnHelper<CartItem>()

const CartTable = ({ cart }: { cart: Cart | null }) => {
  const items = cart?.items || []

  const [globalFilter, setGlobalFilter] = useState('')

  const columns = useMemo<ColumnDef<CartItem, any>[]>(
    () => [
      columnHelper.accessor('id', { header: 'شناسه', cell: ({ row }) => `#${row.original.id}` }),

      columnHelper.display({
        id: 'name',
        header: 'نام محصول / استیکر',
        cell: ({ row }) => (
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {getItemName(row.original)}
          </Typography>
        )
      }),

      columnHelper.display({
        id: 'type',
        header: 'نوع',
        cell: ({ row }) => {
          const type = getItemType(row.original)

          return <Chip label={type} color={type === 'استیکر سفارشی' ? 'success' : type === 'واریانت محصول' ? 'info' : 'primary'} size='small' variant='tonal' />
        }
      }),

      columnHelper.display({
        id: 'unitPrice',
        header: 'قیمت واحد',
        cell: ({ row }) => <Typography variant='body2'>{formatPrice(getItemPrice(row.original))}</Typography>
      }),

      columnHelper.accessor('quantity', {
        header: 'تعداد',
        cell: ({ row }) => (
          <Typography variant='body2' sx={{ fontWeight: 600 }}>
            {row.original.quantity}
          </Typography>
        )
      }),

      columnHelper.display({
        id: 'subtotal',
        header: 'جمع',
        cell: ({ row }) => {
          const price = getItemPrice(row.original)
          const qty = row.original.quantity || 1

          return (
            <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
              {formatPrice(price * qty)}
            </Typography>
          )
        }
      })
    ],
    []
  )

  const table = useReactTable({
    data: items,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    state: { globalFilter },
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  const grandTotal = items.reduce((sum, item) => sum + getItemPrice(item) * (item.quantity || 1), 0)

  return (
    <>
      <div className='flex justify-between items-center p-5 border-b'>
        <Typography variant='h6'>آیتم‌های سبد خرید</Typography>
        <Typography variant='body2' color='text.secondary'>
          جمع کل: <strong>{formatPrice(grandTotal)}</strong>
        </Typography>
      </div>

      <div
        className={tableStyles.tableContainer}
        style={{
          overflow: 'auto'
        }}
      >
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          'flex items-center cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='tabler-chevron-up text-xl' />,
                          desc: <i className='tabler-chevron-down text-xl' />
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={6} className='text-center py-10'>
                  <Typography>سبد خرید خالی است</Typography>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
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
    </>
  )
}

const UserCartCard = ({ carts }: { carts: any }) => {
  const cartData: Cart | null = Array.isArray(carts) ? carts[0] : carts

  return (
    <Card>
      <CartTable cart={cartData} />
    </Card>
  )
}

export default UserCartCard
