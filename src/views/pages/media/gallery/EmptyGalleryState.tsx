'use client'

import { PermMedia } from '@mui/icons-material'
import EmptyState from '@/components/states/EmptyState'

interface EmptyGalleryStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyGalleryState = ({ isSearch = false, searchQuery = '' }: EmptyGalleryStateProps) => {
  const title = isSearch ? `گالری برای "${searchQuery}" یافت نشد` : 'هیچ گالری‌ای یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا گالری جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ گالری‌ای ثبت نشده. می‌تونید گالری جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<PermMedia color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyGalleryState
