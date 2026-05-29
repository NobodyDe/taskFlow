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
  static async checkEmail(email: string): Promise<CheckEmailResponse> {
    const { data } = await api.post<CheckEmailResponse>('/auth/check-email', { email })

    return data
  }

  static async auth(email: string, password: string): Promise<AuthResponse> {
    const { data } = await authApi.post<AuthResponse>('/auth/login', { email, password })
    return data
  }
  static async refreshToken(): Promise<AuthResponse> {
    const { data } = await authApi.post<AuthResponse>('/auth/refresh')
    return data
  }

  static async createAccount(payload: CreateAccountPayload) {
    try {
      const { data } = await authApi.post<AuthResponse>('/auth/create-account', payload)
      useAuthStore.getState().setAccessToken(data.access_token)
    } catch (error) {
      console.log(error)
    }
  }
}
