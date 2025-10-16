'use client'

import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface Props {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyBulkPricingState = ({ isSearch = false, searchQuery = '' }: Props) => {
  const title = isSearch ? `فروش عمده برای "${searchQuery}" یافت نشد` : 'هیچ فروش عمده‌ای یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا فروش عمده جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ فروش عمده‌ای ثبت نشده. می‌تونید فروش عمده جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyBulkPricingState
