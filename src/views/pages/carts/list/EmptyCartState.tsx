'use client'

import { Person } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyUserStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyCartState = ({ isSearch = false, searchQuery = '' }: EmptyUserStateProps) => {
  const title = isSearch ? `سبد خریدی برای "${searchQuery}" یافت نشد` : 'هیچ سبد خریدی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا سبد خرید جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ سبد خریدی ثبت نشده. می‌تونید سبد خرید جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Person color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyCartState
