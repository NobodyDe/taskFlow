import api from '../axios'

interface CheckEmailResponse {
  exists: boolean
}

interface AuthResponse {
  access_token: string
}

// export const authService = {
//   checkEmail: async (email: string): Promise<CheckEmailResponse> => {
//     const { data } = await api.post<CheckEmailResponse>('/auth/check-email', { email })
//     return data
//   },
//   auth: async (email: string, password: string): Promise<AuthResponse> => {
//     const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
//     return data
//   },
//   refreshToken: async (): Promise<AuthResponse> => {
//     const { data } = await api.post<AuthResponse>('auth/refresh')
//     return data
//   },
//   logout: async (): Promise<void> => {
//     await api.post('/auth/logout')
//   },
// }

export class AuthService {
  static async checkEmail(email: string): Promise<CheckEmailResponse> {
    const { data } = await api.post<CheckEmailResponse>('/auth/check-email', { email })

    return data
  }
}
