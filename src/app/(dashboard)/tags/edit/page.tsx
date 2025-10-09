import TagFetcher from '@/views/pages/tags/TagFetcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <TagFetcher id={id ? String(id) : null} />
}

export default Page
