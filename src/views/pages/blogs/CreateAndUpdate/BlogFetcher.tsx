'use client'

import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '@/components/LoadingSpinner'
import { QueryKeys } from '@/types/enums/query-keys'
import { getBlogById } from '@/libs/api/blog.api'
import BlogForm from './BlogForm'

interface BlogFetcherProps {
  id: string | null
}

const BlogFetcher = ({ id }: BlogFetcherProps) => {
  const {
    data: blog,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [QueryKeys.Blog, id],
    queryFn: () => getBlogById(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>خطا در بارگذاری مقاله: {error.message}</div>
  if (!id || !blog?.data) return <div>مقاله یافت نشد</div>

  return <BlogForm blog={blog.data} refetch={refetch} />
}

export default BlogFetcher
