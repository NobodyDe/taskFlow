import { useMutation } from '@tanstack/react-query'
import { authService } from '../../api/services/authService'

export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => authService.checkEmail(email),
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.auth(email, password),
  })
}
