import type { LucideIcon } from 'lucide-react'

export type Priority = 'critical' | 'high' | 'medium' | 'low'
export interface PriorityProps {
  label: string
  color: string
  bg: string
  border: string
  icon: LucideIcon
}
