'use client'

import useAuthStore from '@/store/auth.store'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import LoadingSpinner from '../LoadingSpinner'

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: ReactNode
}

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter()

  const { isLogin, isLoading } = useAuthStore()

  const [isChecking, setIsChecking] = useState(true)

  const checkPermissions = async () => {
    if (isLoading) return

    if (isLogin) {
      router.replace('/home')

      return
    }

    setIsChecking(false)
  }

  useEffect(() => {
    checkPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, isLoading])

  if (isChecking) {
    return <LoadingSpinner />
  }

  return <>{children}</>
}
