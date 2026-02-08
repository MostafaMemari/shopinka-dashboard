import { create } from 'zustand'
import { getMe } from '@/libs/api/user.api'
import { User } from '@/types/app/user.type'

interface AuthStore {
  isLogin: boolean
  user: Partial<User> | null
  isLoading: boolean
  error: string | null

  checkAuth: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthStore>(set => ({
  isLogin: false,
  user: null,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    try {
      set({ isLoading: true, error: null })

      const res = await getMe()

      if (!res.ok) {
        throw new Error(res.message || 'خطا در دریافت اطلاعات کاربر')
      }

      set({
        isLogin: true,
        user: {
          fullName: res.data.fullName || '',
          mobile: res.data.mobile,
          role: res.data.role
        },
        isLoading: false
      })
    } catch (err: any) {
      set({
        isLogin: false,
        user: null,
        isLoading: false,
        error: err.message || 'خطای ناشناخته'
      })
    }
  },

  logout: () =>
    set({
      isLogin: false,
      user: null,
      isLoading: false,
      error: null
    })
}))
