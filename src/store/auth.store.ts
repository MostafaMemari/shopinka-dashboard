import { getMe } from '@/libs/api/user.api'
import { User } from '@/types/app/user.type'
import { create } from 'zustand'

interface AuthStore {
  isLogin: boolean
  user: User | null
  isLoading: boolean
  error: string | null

  loginStart: () => void
  loginSuccess: (user: User) => void
  loginFailure: (error: string) => void
  logout: () => void
  setLoading: (loading: boolean) => void
  checkAuth: () => Promise<void>
}

const useAuthStore = create<AuthStore>(set => ({
  isLogin: false,
  user: null,
  isLoading: true,
  error: null,

  loginStart: () => set({ isLoading: true, error: null }),
  loginSuccess: (user: User) => set({ isLogin: true, user, isLoading: false }),
  loginFailure: (error: string) => set({ isLoading: false, error }),
  logout: () => set({ isLogin: false, user: null, isLoading: false, error: null }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),

  checkAuth: async () => {
    try {
      set({ isLoading: true })
      const res = await getMe()

      if (!res.ok) throw new Error(res.message || 'خطا در دریافت اطلاعات کاربر')

      const user = res.data

      set({ isLogin: true, user, isLoading: false })
    } catch (err) {
      set({ isLogin: false, user: null, isLoading: false })
    }
  }
}))

export default useAuthStore
