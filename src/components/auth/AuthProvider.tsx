import { useEffect, useState, type ReactNode } from 'react'
import LoadingScreen from './LoadingScreen'
import { AuthService } from '../../api/services/authService'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsloading] = useState<boolean>(true)

  useEffect(() => {
    async function checkLogin() {
      try {
        await AuthService.refreshToken()
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
