'use client'

import EmptyState from '@/components/states/EmptyState'
import { Image } from '@mui/icons-material'

interface EmptyBannerStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyBannerState = ({ isSearch = false, searchQuery = '' }: EmptyBannerStateProps) => {
  const title = isSearch ? `بنر برای "${searchQuery}" یافت نشد` : 'هیچ بنری یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا بنر جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ بنر‌ی ثبت نشده. می‌تونید بنر جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} icon={<Image color='action' sx={{ fontSize: 60, mb: 2, opacity: 0.7 }} />} />
}

export default EmptyBannerState
