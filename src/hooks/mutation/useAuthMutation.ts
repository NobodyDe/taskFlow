import { useMutation } from '@tanstack/react-query'
import { AuthService, type CreateAccountPayload } from '../../api/services/authService'

export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => AuthService.checkEmail(email),
  })
}

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthService.auth(email, password),
  })
}
export function useCreateAccount() {
  return useMutation({
    mutationFn: (payload: CreateAccountPayload) => AuthService.createAccount(payload),
  })
}
