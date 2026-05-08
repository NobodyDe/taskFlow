import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Calendar,
  MessageSquare,
  Paperclip,
  Trash2,
} from 'lucide-react'
import type { Priority, PriorityProps } from '../../types/priority'
import type { CardProps } from '../../types/CardProps'
import { typograph } from './typograph'
import { useState } from 'react'
import { useBoardStore } from '../../stores/useBoardStore'

const priorityConfig: Record<Priority, PriorityProps> = {
  critical: {
    label: 'Crítico',
    color: '#ff3b30',
    bg: 'rgba(255,59,48,0.1)',
    border: 'rgba(255,59,48,0.25)',
    icon: AlertCircle,
  },
  high: {
    label: 'Alto',
    color: '#ff9500',
    bg: 'rgba(255,149,0,0.1)',
    border: 'rgba(255,149,0,0.25)',
    icon: AlertTriangle,
  },
  medium: {
    label: 'Médio',
    color: '#ffd60a',
    bg: 'rgba(255,214,10,0.08)',
    border: 'rgba(255,214,10,0.2)',
    icon: ArrowUp,
  },
  low: {
    label: 'Baixo',
    color: '#32d74b',
    bg: 'rgba(50,215,75,0.08)',
    border: 'rgba(50,215,75,0.2)',
    icon: ArrowDown,
  },
}

function isOverdue(dueDate?: string): boolean {
  if (!dueDate) return false
  const due = new Date(dueDate + 'T23:59:59')
  return due < new Date()
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('pt-br', { day: '2-digit', month: 'short' })
}

function DeleteCardModal({ onClose, id }) {
  const deleteCard = useBoardStore((state) => state.deleteCard)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <form className="relative w-80 bg-[#111] border border-[#222] rounded-2xl shadow-2xl p-6 flex flex-col gap-1">
        <h1 className={typograph({})}>Tem certeza que deseja remover esse card?</h1>

        <span className={typograph({ size: 'xs', color: 'detail' })}>
          Todos as informações serão apagadas
        </span>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex-1 px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white hover:bg-[#1e1e1e] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={() => deleteCard(id)}
            className="flex-1 flex gap-2 justify-center px-4 py-2 rounded-lg bg-[#ff3b30] text-foregroud text-sm font-semibold hover:bg-[#53130f] transition-colors items-center cursor-pointer"
          >
            <Trash2 size={13} />
            Remover
          </button>
        </div>
      </form>
    </div>
  )
}

export default function Card({
  id,
  title,
  description,
  priority,
  tags,
  assignee,
  assigneeColor,
  dueDate,
  columnId,
  createdAt,
  attachments,
  comments,
}: CardProps) {
  const config = priorityConfig[priority]
  const Icon = config.icon
  const [openDeleteModal, setOpenDeleteModal] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-2 group relative bg-[#161616] border border-[#222] rounded-xl px-6 py-3.5 hover:border-[#333] transition-all duration-150 hover:bg-hover select-none">
      <div
        className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
        style={{ backgroundColor: config.color }}
      />
      {/* header */}
      <div className="flex items-start justify-between gap-2">
        <span
          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium shrink-0"
          style={{
            color: config.color,
            backgroundColor: config.bg,
            border: `1px solid ${config.border}`,
          }}
        >
          <Icon size={10} />
          {config.label}
        </span>
        <button
          onClick={() => setOpenDeleteModal(id)}
          className="opacity-0 group-hover:opacity-100 text-[#444] hover:text-[#ff3b30] transition-all p-0.5 rounded cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
      {openDeleteModal && <DeleteCardModal id={id} onClose={() => setOpenDeleteModal(null)} />}

      {/* title */}
      <h3 className={typograph({ size: 'detail' })}>{title}</h3>

      {/* description */}
      {description && <p className={typograph({ size: 'xs', color: 'detail' })}>{description}</p>}

      {/* tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 rounded text-[10px] text-[#666] bg-hover border border-[#2a2a2a]"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* footer */}

      <div className="flex items-center justify-between">
        {/* assignner */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-foreground shrink-0"
          style={{ backgroundColor: assigneeColor }}
          title={assignee}
        >
          {assignee}
        </div>

        <div className="flex gap-3">
          {/* dueDate  */}
          {dueDate && (
            <span
              className={`flex items-center gap-1 text-[10px] ${isOverdue(dueDate) ? 'text-[#ff3b30]' : 'text-[#555]'}`}
            >
              <Calendar size={10} />
              {formatDate(dueDate)}
            </span>
          )}

          {/* Comments */}
          {comments > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-[#555]">
              <MessageSquare size={10} />
              {comments}
            </span>
          )}

          {/* Attachments */}
          {attachments > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-[#555]">
              <Paperclip size={10} />
              {attachments}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
