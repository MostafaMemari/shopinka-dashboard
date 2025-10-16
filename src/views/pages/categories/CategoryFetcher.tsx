'use client'

import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import { QueryKeys } from '@/types/enums/query-keys'
import CategoryView from './CreateAndUpdate/CategoryView'
import { getCategoryById } from '@/libs/api/category.api'

interface Props {
  id: string | null
}

const CategoryFetcher = ({ id }: Props) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [QueryKeys.Category, id],
    queryFn: () => getCategoryById(Number(id)),
    enabled: !!id
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>خطا در بارگذاری : {error.message}</div>
  if (!id || !data?.data) return <div>برچسب یافت نشد</div>

  return <CategoryView category={data.data} />
}

export default CategoryFetcher
