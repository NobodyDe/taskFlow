import { Check, Clock, Flag, Trash2 } from 'lucide-react'
import { teamMembers } from '../ui/Header'
import { useBoardStore } from '../../stores/useBoardStore'
import type { Priority } from '../../types/priority'

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Baixo', color: '#32d74b' },
  { value: 'medium', label: 'Médio', color: '#ffd60a' },
  { value: 'high', label: 'Alto', color: '#ff9500' },
  { value: 'critical', label: 'Crítico', color: '#ff3b30' },
]

export default function SidebarCardModal() {
  const card = useBoardStore((s) => (s.selectedCardId ? s.cards[s.selectedCardId] : null))
  const columns = useBoardStore((s) => s.columns)

  if (!card) return null

  return (
    <div className="w-80 border-l border-hover bg-[#0a0a0a] shrink-0 overflow-y-auto p-6">
      <div className="space-y-6">
        {/* Status */}
        <div>
          <label className="block text-xs text-[#666] mb-2 font-medium uppercase tracking-wider">
            Status
          </label>
          <div className="space-y-1.5">
            {columns.map((col) => (
              <button
                key={col.id}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: card?.columnId === col.id ? `${col.color}15` : 'transparent',
                  border: `1px solid ${card?.columnId === col.id ? `${col.color}40` : '#1a1a1a'}`,
                  color: card?.columnId === col.id ? col.color : '#888',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                {col.title}
                {card?.columnId === col.id && <Check size={14} className="ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-xs text-[#666] mb-2 font-medium uppercase tracking-wider">
            Prioridade
          </label>
          <div className="space-y-1.5">
            {priorityOptions.map((opt) => (
              <button
                key={opt.value}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: card?.priority === opt.value ? `${opt.color}15` : 'transparent',
                  border: `1px solid ${card?.priority === opt.value ? `${opt.color}40` : '#1a1a1a'}`,
                  color: card?.priority === opt.value ? opt.color : '#888',
                }}
              >
                <Flag size={14} />
                {opt.label}
                {card.priority === opt.value && <Check size={14} className="ml-auto" />}
              </button>
            ))}
          </div>
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-xs text-[#666] mb-2 font-medium uppercase tracking-wider">
            Responsável
          </label>
          <div className="space-y-2">
            {teamMembers.map((member) => (
              <button
                key={member.initials}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  card.assignee === member.initials
                    ? 'bg-[#151515] border border-[#282828]'
                    : 'border border-transparent hover:bg-[#111]'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-white text-sm">{member.name}</p>
                  <p className="text-[#555] text-xs">{member.role}</p>
                </div>
                {card.assignee === member.initials && <Check size={14} className="text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs text-[#666] mb-2 font-medium uppercase tracking-wider">
            Data de entrega
          </label>
          <input
            type="date"
            value={card.dueDate || ''}
            className="w-full bg-[#111] border border-border rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#333] transition-colors [color-scheme:dark]"
          />
          {card.dueDate && new Date(card.dueDate) < new Date() && (
            <p className="mt-2 text-xs text-[#ff3b30] flex items-center gap-1">
              <Clock size={11} />
              Atrasado
            </p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs text-[#666] mb-2 font-medium uppercase tracking-wider">
            Tags
          </label>
          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs text-[#aaa] bg-[#111] border border-[#1e1e1e]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#1a1a1a]">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm text-[#ff3b30] bg-[#ff3b30]/10 border border-[#ff3b30]/20 hover:bg-[#ff3b30]/20 transition-colors">
            <Trash2 size={14} />
            Excluir card
          </button>
        </div>
      </div>
    </div>
  )
}
