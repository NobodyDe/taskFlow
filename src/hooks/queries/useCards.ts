import { useQuery } from '@tanstack/react-query'
import { useBoardStore } from '../../stores/useBoardStore'
import { cardService } from '../../api/services/cardService'

export default function useCards(columnId: string) {
  const { selectedProject } = useBoardStore()

  return useQuery({
    queryKey: ['cards', selectedProject, columnId],
    queryFn: () => {
      if (!selectedProject) {
        throw new Error('Projeto não selecionado')
      }
      return cardService.getCards(columnId, selectedProject)
    },
    enabled: !!selectedProject && !!columnId,
  })
}
