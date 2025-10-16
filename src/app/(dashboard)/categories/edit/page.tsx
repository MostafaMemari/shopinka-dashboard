import CategoryFetcher from '@/views/pages/categories/CategoryFetcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <CategoryFetcher id={id ? String(id) : null} />
}

export default Page
