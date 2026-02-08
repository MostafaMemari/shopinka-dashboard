'use client'

import useAuthStore from '@/store/auth.store'
import { useEffect } from 'react'

const AppInitializer = () => {
  const { checkAuth } = useAuthStore(state => state)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return null
}

export default AppInitializer
