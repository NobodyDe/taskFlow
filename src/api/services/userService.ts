import type { User } from '../../types/User'
import api from '../axios'

export const userService = {
  getMe: async (): Promise<User> => {
    const { data } = await api.get<User>('/users/01KS15P0R34ZA1D66SP4697FQX')
    return data
  },

  //    // Atualiza dados do perfil
  //    updateProfile: async (payload: Partial<User>): Promise<User> => {
  //     const { data } = await api.patch<User>('/users/me', payload)
  //     return data
  //   },
}
