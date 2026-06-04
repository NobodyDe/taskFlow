import { useQuery } from '@tanstack/react-query'
import { columnService } from '../../api/services/columnService'
import { useBoardStore } from '../../stores/useBoardStore'

export function useColumns() {
  const { selectedProject } = useBoardStore()

  return useQuery({
    queryKey: ['columns', selectedProject],
    queryFn: () => {
      if (!selectedProject) {
        throw new Error('Projeto não selecionado')
      }
      return columnService.getColumns(selectedProject)
    },
    enabled: !!selectedProject,
  })
}
