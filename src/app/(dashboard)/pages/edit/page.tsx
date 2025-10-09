import PageFetcher from '@/views/pages/pages/PageFetcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <PageFetcher id={id ? String(id) : null} />
}

export default Page
