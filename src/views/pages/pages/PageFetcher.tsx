'use client'

import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import { QueryKeys } from '@/types/enums/query-keys'
import { getPageById } from '@/libs/api/page.api'
import PageView from './CreateAndUpdate/PageView'

interface PageFetcherProps {
  id: string | null
}

const PageFetcher = ({ id }: PageFetcherProps) => {
  const {
    data: page,
    isLoading,
    error
  } = useQuery({
    queryKey: [QueryKeys.Page, id],
    queryFn: () => getPageById(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>خطا در بارگذاری برگه: {error.message}</div>
  if (!id || !page?.data) return <div>برگه یافت نشد</div>

  return <PageView page={page.data} />
}

export default PageFetcher
