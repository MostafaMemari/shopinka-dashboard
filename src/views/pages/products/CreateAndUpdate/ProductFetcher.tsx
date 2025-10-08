'use client'

import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/libs/api/product.api'
import ProductForm from '@/views/pages/products/CreateAndUpdate/ProductForm'
import LoadingSpinner from '@/components/LoadingSpinner'
import { QueryKeys } from '@/types/enums/query-keys'

interface ProductFetcherProps {
  id: string | null
}

const ProductFetcher = ({ id }: ProductFetcherProps) => {
  const {
    data: product,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [QueryKeys.Product, id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  })

  if (isLoading) return <LoadingSpinner />
  if (error) return <div>خطا در بارگذاری محصول: {error.message}</div>
  if (!id || !product?.data) return <div>محصول یافت نشد</div>

  return <ProductForm product={product.data} refetch={refetch} />
}

export default ProductFetcher
