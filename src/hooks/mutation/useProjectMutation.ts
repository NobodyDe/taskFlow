import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectService, type UpdateProjectPayload } from '../../api/services/projectService'
import type { Project } from '../../types/Project'

export function useUpdateProject() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) => projectService.updateProject(payload),
    onSuccess: (updatedProject) => {
      queryClient.setQueryData(['projects'], (old: Project[] | undefined) =>
        old?.map((p) => (p.id === updatedProject.id ? updatedProject : p))
      )
    },
  })
}
