import axios from 'axios'
import { useAuthStore } from '../stores/useAuthStore'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { Accept: 'application/json' },
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    const isAuthRoute =
      originalRequest?.url?.includes('/auth/login') ||
      originalRequest?.url?.includes('/auth/check-email') ||
      originalRequest?.url?.includes('/auth/refresh')

    if (isAuthRoute) {
      return Promise.reject(error)
    }

    // if (error.response?.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true
    //   try {
    //     const { data } = await api.post('/auth/refresh')

    //     useAuthStore.getState().setAccessToken(data.access_token)

    //     originalRequest.headers.Authorization = `Bearer ${data.access_token}`
    //     return api(originalRequest)
    //   } catch (refreshError) {
    //     useAuthStore.getState().logout()
    //     window.location.href = '/Login'
    //     return Promise.reject(refreshError)
    //   }
    // }

    return Promise.reject(error)
  }
)

export default api
