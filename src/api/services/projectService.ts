import type { Project } from '../../types/Project'
import api from '../axios'

export class projectService {
  static async getProjects(): Promise<Project[]> {
    const { data } = await api.get<Project[]>('/projects')
    console.log(data)
    return data
  }
}
