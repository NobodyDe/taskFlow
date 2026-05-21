import { useQuery } from '@tanstack/react-query'
import { userService } from '../../api/services/userService'

export function useUser() {
  return useQuery({ queryKey: ['user'], queryFn: userService.getMe, staleTime: 1000 * 60 * 10 })
}
