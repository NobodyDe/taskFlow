import { useQuery } from '@tanstack/react-query'
import { UserService } from '../../api/services/userService'

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: UserService.getMe,
    staleTime: 1000 * 60 * 10,
  })
}
