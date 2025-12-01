'use client'

import EmptyState from '@/components/states/EmptyState'
import { FontDownloadOff } from '@mui/icons-material'

interface EmptyFontStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyFontState = ({ isSearch = false, searchQuery = '' }: EmptyFontStateProps) => {
  const title = isSearch ? `فونت برای "${searchQuery}" یافت نشد` : 'هیچ فونتی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفا عبارت دیگری را امتحان کنید یا فونت جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ فونتی ثبت نشده. می‌تونید فونت جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<FontDownloadOff color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyFontState
