import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '../../stores/useAuthStore'
import LoadingScreen from './LoadingScreen'
import { AuthService } from '../../api/services/authService'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsloading] = useState<boolean>(true)
  const { setAccessToken } = useAuthStore()

  useEffect(() => {
    async function checkLogin() {
      try {
        const { access_token } = await AuthService.refreshToken()
        setAccessToken(access_token)
      } catch {
        console.log('usuario não logado')
      } finally {
        setIsloading(false)
      }
    }
    checkLogin()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return children
}
