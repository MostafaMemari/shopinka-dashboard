import { Product } from '@/types/app/product.type'
import { createContext, useContext } from 'react'

type ProductContextType = {
  product: Product | undefined
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider = ({ product, children }: { product?: Product; children: React.ReactNode }) => {
  return <ProductContext.Provider value={{ product }}>{children}</ProductContext.Provider>
}

export const useProductContext = () => {
  const ctx = useContext(ProductContext)

  if (!ctx) throw new Error('useProductContext must be used inside ProductProvider')

  return ctx
}
