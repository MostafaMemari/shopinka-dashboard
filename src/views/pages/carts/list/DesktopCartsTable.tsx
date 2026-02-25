'use client'

import { useState, Fragment } from 'react'
import { Box, Typography, Chip, IconButton, Collapse, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Link from 'next/link'
import { Cart } from '@/types/app/cart.type'

// Helper Functions
const formatPrice = (price?: number | null) => {
  if (!price) return '—'

  return `${price.toLocaleString('fa-IR')} تومان`
}

const getItemName = (item: any) => {
  if (item.product) return item.product.name || `محصول #${item.product.id}`
  if (item.productVariant) return `واریانت محصول #${item.productVariant.productId || item.productVariant.id}`

  if (item.customSticker) {
    const name = item.customSticker.name || item.customSticker.description || 'استیکر سفارشی'
    const linesText = item.customSticker.lines?.map((l: any) => l.text).join(' - ') || ''

    return linesText ? `${name} (${linesText})` : name
  }

  return 'نامشخص'
}

const getItemType = (item: any) => {
  if (item.product) return 'محصول ساده'
  if (item.productVariant) return 'واریانت محصول'
  if (item.customSticker) return 'استیکر سفارشی'

  return 'نامشخص'
}

const getItemPrice = (item: any) => {
  if (item.product) return item.product.salePrice || item.product.basePrice || 0
  if (item.productVariant) return item.productVariant.salePrice || item.productVariant.basePrice || 0
  if (item.customSticker) return item.customSticker.finalPrice || 0

  return 0
}

const calculateCartTotal = (items: any[]) => {
  return items.reduce((sum, item) => sum + getItemPrice(item) * (item.quantity || 1), 0)
}

const CartRow = ({ cart }: { cart: Cart }) => {
  const [open, setOpen] = useState(false)
  const totalAmount = calculateCartTotal(cart.items)

  return (
    <Fragment>
      <TableRow
        hover
        onClick={() => setOpen(!open)}
        sx={{
          cursor: 'pointer',
          '& > *': { borderBottom: 'unset' },
          backgroundColor: open ? 'action.hover' : 'inherit',
          transition: 'background-color 0.3s ease'
        }}
      >
        <TableCell>
          <Link href={`/carts/${cart.id}`} passHref legacyBehavior>
            <MuiLink underline='hover' fontWeight='medium' color='primary.main' onClick={e => e.stopPropagation()}>
              #{cart.id}
            </MuiLink>
          </Link>
        </TableCell>

        <TableCell>{cart.user?.mobile}</TableCell>

        <TableCell>{new Date(cart.createdAt).toLocaleDateString('fa-IR')}</TableCell>
        <TableCell>
          {new Date(cart.updatedAt).toLocaleTimeString('fa-IR')} - {new Date(cart.updatedAt).toLocaleDateString('fa-IR')}
        </TableCell>
        <TableCell align='center'>
          <Chip label={`${cart.items.length} آیتم`} color='primary' size='small' variant='filled' />
        </TableCell>
        <TableCell align='right'>
          <Typography sx={{ fontWeight: 600 }}>{formatPrice(totalAmount)}</Typography>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={e => {
              e.stopPropagation()
              setOpen(!open)
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box
              sx={{
                margin: 2,
                padding: 3,
                backgroundColor: 'background.default',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>شناسه</TableCell>
                    <TableCell>نام محصول / استیکر</TableCell>
                    <TableCell>نوع</TableCell>
                    <TableCell>قیمت واحد</TableCell>
                    <TableCell align='center'>تعداد</TableCell>
                    <TableCell align='right'>جمع</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} align='center' sx={{ py: 3 }}>
                        <Typography color='text.secondary' variant='body2'>
                          این سبد خرید خالی است
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    cart.items.map(item => {
                      const price = getItemPrice(item)
                      const subtotal = price * (item.quantity || 1)

                      return (
                        <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component='th' scope='row'>
                            #{item.id}
                          </TableCell>
                          <TableCell>{getItemName(item)}</TableCell>
                          <TableCell>
                            <Typography variant='body2' color='text.secondary'>
                              {getItemType(item)}
                            </Typography>
                          </TableCell>
                          <TableCell>{formatPrice(price)}</TableCell>
                          <TableCell align='center'>{item.quantity}</TableCell>
                          <TableCell align='right' sx={{ fontWeight: 500 }}>
                            {formatPrice(subtotal)}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', borderTop: '1px dashed', borderColor: 'divider', pt: 2 }}>
                <Typography variant='subtitle1' fontWeight={700} color='primary'>
                  جمع کل سبد: {formatPrice(totalAmount)}
                </Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const DesktopCartTable = ({ carts }: { carts: Cart[] }) => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
      <Table aria-label='collapsible table'>
        <TableHead sx={{ backgroundColor: 'action.hover' }}>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell>موبایل</TableCell>
            <TableCell>تاریخ ایجاد</TableCell>
            <TableCell>آخرین تغییرات</TableCell>
            <TableCell align='center'>تعداد آیتم</TableCell>
            <TableCell align='right'>جمع کل</TableCell>
            <TableCell width={50} />
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align='center' sx={{ py: 10 }}>
                <Typography color='text.secondary' variant='h6'>
                  هیچ سبد خریدی یافت نشد!
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            carts.map(cart => <CartRow key={cart.id} cart={cart} />)
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DesktopCartTable
