import type { Project } from '../../types/Project'
import api from '../axios'

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects?userId=01KS5F1JVQMMH98JDGRV2S4CV6')
    return data
  },
}
