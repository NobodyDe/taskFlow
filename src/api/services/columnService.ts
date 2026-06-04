import type { initialColumnProps } from '../../types/initialColumnProps'
import api from '../axios'

export class columnService {
  static async getColumns(projectId: string): Promise<initialColumnProps[]> {
    const { data } = await api.get(`/columns?projectId=${projectId}`)
    return data
  }
}
