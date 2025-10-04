'use client'

import { Person } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyUserStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyUserState = ({ isSearch = false, searchQuery = '' }: EmptyUserStateProps) => {
  const title = isSearch ? `کاربری برای "${searchQuery}" یافت نشد` : 'هیچ کاربری یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا کاربر جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ کاربری ثبت نشده. می‌تونید کاربر جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Person color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyUserState
