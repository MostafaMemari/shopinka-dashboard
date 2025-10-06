import { QueryOptions } from '@/types/queryOptions'
import { useQuery } from '@tanstack/react-query'
import { getProductById, getProducts } from '@/libs/api/product.api'
import { QueryKeys } from '@/types/enums/query-keys'

export function useProducts({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  const fetchProducts = () => getProducts(params).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Products, params],
    queryFn: fetchProducts,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}

export function useProductById({ enabled = true, productId, staleTime = 1 * 60 * 1000 }: QueryOptions & { productId: number }) {
  const fetchProduct = () => getProductById(Number(productId)).then(res => res)

  return useQuery<any, Error>({
    queryKey: [QueryKeys.Product, productId],
    queryFn: fetchProduct,
    enabled,
    staleTime,
    refetchOnWindowFocus: false
  })
}
