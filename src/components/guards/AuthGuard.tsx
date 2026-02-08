'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'

interface AuthGuardProps {
  children: ReactNode
}

const ALLOWED_ROLES = ['SUPER_ADMIN', 'ADMIN']

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { isLogin, isLoading, checkAuth, user } = useAuthStore()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (mounted && !isLoading) {
      if (!isLogin || !user || !user.role || !ALLOWED_ROLES.includes(user.role)) {
        router.replace('/login')
      }
    }
  }, [mounted, isLogin, isLoading, user, router])

  if (!mounted || isLoading) {
    return null
  }

  return <>{children}</>
}
