import ProductForm from '@/views/pages/products/CreateAndUpdate/ProductForm'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const EditProduct = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  return <ProductForm />
}

export default EditProduct
