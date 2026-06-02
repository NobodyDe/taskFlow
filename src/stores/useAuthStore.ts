import { create } from 'zustand'
import type { User } from '../types/User'
import { jwtDecode } from 'jwt-decode'

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  user: User | null
  setAccessToken: (token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  user: null,
  setAccessToken: (token) => {
    const user = jwtDecode(token) as User

    set({ accessToken: token, isAuthenticated: true, user })
  },
  logout: () => set({ accessToken: null, isAuthenticated: false, user: null }),
}))
