import type { Project } from '../../types/Project'
import api from '../axios'

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects?userId=01KS15P0R34ZA1D66SP4697FQX')
    return data
  },
}
