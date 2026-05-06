import type { Priority } from './priority'

export interface CardProps {
  id: string
  title: string
  description: string
  priority: Priority
  tags: string[]
  assignee: string
  assigneeColor: string
  dueDate?: string
  columnId: string
  createdAt: string
  attachments: number
  comments: number
}
