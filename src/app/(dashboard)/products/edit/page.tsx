import { getProductById } from '@/libs/api/product.api'
import ProductForm from '@/views/pages/products/CreateAndUpdate/ProductForm'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const EditProduct = async ({ searchParams }: PageProps) => {
  const { id } = await searchParams

  const res = await getProductById(Number(id))

  return <ProductForm product={res.data ?? undefined} />
}

export default EditProduct
