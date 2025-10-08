import BlogFetcher from '@/views/pages/blogs/CreateAndUpdate/BlogFetcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const EditBlog = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <BlogFetcher id={id ? String(id) : null} />
}

export default EditBlog
