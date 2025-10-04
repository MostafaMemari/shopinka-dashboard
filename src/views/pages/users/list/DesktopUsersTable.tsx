'use client'

import { Box, Chip, Typography } from '@mui/material'
import tableStyles from '@core/styles/table.module.css'
import { User } from '@/types/app/user.type'
import Link from 'next/link'

interface DesktopUserTableProps {
  users: User[]
}

const DesktopUserTable = ({ users }: DesktopUserTableProps) => {
  return (
    <Box className='overflow-x-auto'>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام و نام خانوادگی</th>
            <th>شماره موبایل</th>
            <th>وضعیت</th>
            <th>نقش</th>
            <th>تاریخ ثبت نام</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className='text-center'>
                هیچ محصولی یافت نشد
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td className='text-sky-300 dark:text-sky-600'>
                  <Link href={`/users/${user.id}`}>{user.id}#</Link>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {user.fullName}
                  </Typography>
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {user.mobile}
                  </Typography>
                </td>
                <td>
                  <Chip label={user.isVerifiedMobile ? 'تایید شده' : 'تایید نشده'} color={user.isVerifiedMobile ? 'success' : 'error'} size='small' />
                </td>
                <td>
                  <Typography className='font-medium' color='text.primary'>
                    {user.role === 'CUSTOMER' ? 'مشتری' : user.role === 'ADMIN' ? 'مدیر' : 'ناشناخته'}
                  </Typography>
                </td>

                <td>{user?.createdAt ? new Date(user.createdAt).toLocaleString('fa-ir') : '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Box>
  )
}

export default DesktopUserTable
