'use client'

import EmptyState from '@/components/states/EmptyState'

interface EmptyMaterialStickerStateProps {
  isSearch?: boolean
  searchQuery?: string
}

const EmptyMaterialStickerState = ({ isSearch = false, searchQuery = '' }: EmptyMaterialStickerStateProps) => {
  const title = isSearch ? `متریال برای "${searchQuery}" یافت نشد` : 'هیچ متریالی یافت نشد'

  const subtitle = isSearch
    ? 'جستجوی شما نتیجه‌ای نداشت. لطفاً عبارت دیگری را امتحان کنید یا متریال جدیدی اضافه کنید.'
    : 'به نظر می‌رسه هنوز هیچ متریالی ثبت نشده. می‌تونید متریال جدیدی اضافه کنید!'

  return <EmptyState title={title} subtitle={subtitle} />
}

export default EmptyMaterialStickerState
