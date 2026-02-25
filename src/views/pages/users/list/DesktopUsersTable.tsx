'use client'

import { Chip, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { User } from '@/types/app/user.type'
import Link from 'next/link'

interface DesktopUserTableProps {
  users: User[]
}

const DesktopUserTable = ({ users }: DesktopUserTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>شناسه</TableCell>
            <TableCell align='center'>نام و نام خانوادگی</TableCell>
            <TableCell align='center'>شماره موبایل</TableCell>
            <TableCell align='center'>وضعیت</TableCell>
            <TableCell align='center'>نقش</TableCell>
            <TableCell align='center'>تاریخ ثبت نام</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                هیچ محصولی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            users.map(user => (
              <TableRow key={user.id} hover sx={{ transition: 'background-color 0.3s ease' }}>
                <TableCell align='center'>
                  <Link href={`/users/${user.id}`}>
                    <Typography color='primary'>{user.id}#</Typography>
                  </Link>
                </TableCell>

                <TableCell align='center'>
                  <Typography fontWeight={500}>{user.fullName ?? '-'}</Typography>
                </TableCell>

                <TableCell align='center'>
                  <Typography fontWeight={500}>{user.mobile}</Typography>
                </TableCell>

                <TableCell align='center'>
                  <Chip label={user.isVerifiedMobile ? 'تایید شده' : 'تایید نشده'} color={user.isVerifiedMobile ? 'success' : 'error'} size='small' />
                </TableCell>

                <TableCell align='center'>
                  <Typography fontWeight={500}>{user.role === 'CUSTOMER' ? 'مشتری' : user.role === 'ADMIN' ? 'مدیر' : 'ناشناخته'}</Typography>
                </TableCell>

                <TableCell align='center'>{user?.createdAt ? new Date(user.createdAt).toLocaleString('fa-IR') : '-'}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DesktopUserTable
