import ProductFetcher from '@/views/pages/products/CreateAndUpdate/ProductFetcher'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const EditProduct = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <ProductFetcher id={id ? String(id) : null} />
}

export default EditProduct
