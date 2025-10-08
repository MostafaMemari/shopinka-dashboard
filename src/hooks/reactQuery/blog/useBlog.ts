import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/types/enums/query-keys'
import { getBlogById, getBlogs } from '@/libs/api/blog.api'

export function useBlogs({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchBlogs = () => getBlogs(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Blogs, params],
    queryFn: fetchBlogs,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useBlogById({ enabled = true, blogId, staleTime = 1 * 60 * 1000 }: QueryOptions & { blogId: number }) {
  const fetchBlog = () => getBlogById(Number(blogId)).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Blog, blogId],
    queryFn: fetchBlog,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
