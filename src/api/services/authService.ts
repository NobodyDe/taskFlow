import Cookies from 'js-cookie'

import { useAuthStore } from '../../stores/useAuthStore'
import { authApi } from '../authAPi'
import api from '../axios'

interface CheckEmailResponse {
  userEmailExist: boolean
}

export interface CreateAccountPayload {
  first_name: string
  last_name: string
  initials: string
  position: string
  color_hex: string
  email: string
  password: string
}

interface AuthResponse {
  access_token: string
}

export class AuthService {
  private static syncAccessTokenFromCookie() {
    const token = Cookies.get('access_token')

    if (!token) {
      useAuthStore.getState().logout()
      throw new Error('Token de autenticação não encontrado no cookie')
    }
    useAuthStore.getState().setAccessToken(token)
  }
  static async checkEmail(email: string): Promise<CheckEmailResponse> {
    const { data } = await authApi.post<CheckEmailResponse>('/auth/check-email', { email })

    return data
  }

  static async auth(email: string, password: string) {
    await authApi.post<AuthResponse>('/auth/login', { email, password })
    AuthService.syncAccessTokenFromCookie()
  }
  static async refreshToken() {
    await api.post<AuthResponse>('/auth/refresh')
    AuthService.syncAccessTokenFromCookie()
  }

  static async createAccount(payload: CreateAccountPayload) {
    try {
      await authApi.post<AuthResponse>('/auth/create-account', payload)
      AuthService.syncAccessTokenFromCookie()
    } catch (error) {
      console.log(error)
    }
  }
}
