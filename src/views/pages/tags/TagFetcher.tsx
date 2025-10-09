'use client'

import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import { QueryKeys } from '@/types/enums/query-keys'
import { getTagById } from '@/libs/api/tag.api'
import TagView from './CreateAndUpdate/TagView'

interface Props {
  id: string | null
}

const TagFetcher = ({ id }: Props) => {
  const {
    data: page,
    isLoading,
    error
  } = useQuery({
    queryKey: [QueryKeys.Page, id],
    queryFn: () => getTagById(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>خطا در بارگذاری : {error.message}</div>
  if (!id || !page?.data) return <div>برچسب یافت نشد</div>

  return <TagView tag={page.data} />
}

export default TagFetcher
