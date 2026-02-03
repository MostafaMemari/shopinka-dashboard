'use client'

import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface Props {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyManitor404State = ({ isSearch = false, searchQuery = '' }: Props) => {
  const title = isSearch ? `نتیجه‌ای برای "${searchQuery}" پیدا نشد` : 'هیچ خطای 404 ثبت نشده'

  const subtitle = isSearch ? 'عبارت دیگری را جستجو کنید.' : 'وقتی بازدیدکننده‌ها به لینک نامعتبر برسن، اینجا نمایش داده میشه.'

  return <EmptyState title={title} subtitle={subtitle} icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyManitor404State
