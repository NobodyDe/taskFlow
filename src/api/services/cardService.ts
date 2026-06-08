import type { CardProps } from '../../types/CardProps'
import api from '../axios'

export class cardService {
  static async getCards(columnId: string, projectId: string): Promise<CardProps[]> {
    const { data } = await api.get(`/cards?columnId=${columnId}&projectId=${projectId}`)
    return data
  }
}
