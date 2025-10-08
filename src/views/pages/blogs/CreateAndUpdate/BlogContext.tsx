import { Blog } from '@/types/app/blog.type'
import { createContext, useContext } from 'react'

type BlogContextType = {
  blog: Blog | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export const BlogProvider = ({ blog, children }: { blog?: Blog; children: React.ReactNode }) => {
  return <BlogContext.Provider value={{ blog }}>{children}</BlogContext.Provider>
}

export const useBlogContext = () => {
  const ctx = useContext(BlogContext)

  if (!ctx) throw new Error('useBlogContext must be used inside BlogProvider')

  return ctx
}
