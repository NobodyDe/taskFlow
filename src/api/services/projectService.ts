import type { Project } from '../../types/Project'
import api from '../axios'

export interface UpdateProjectPayload {
  projectId: string
  name?: string
  description?: string
}

export class projectService {
  static async getProjects(): Promise<Project[]> {
    const { data } = await api.get<Project[]>('/projects')
    return data
  }
  static async updateProject(payload: UpdateProjectPayload): Promise<void> {
    const { data } = await api.patch('/projects', payload)
    return data
  }
}
