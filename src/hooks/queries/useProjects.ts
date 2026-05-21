import { useQuery } from '@tanstack/react-query'
import { projectService } from '../../api/services/projectService'

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
    staleTime: 1000 * 60 * 10,
  })
}
