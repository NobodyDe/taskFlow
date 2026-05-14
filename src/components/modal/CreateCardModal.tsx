import { Calendar, Flag, Plus, Tag, User, X } from 'lucide-react'
import type { Priority } from '../../types/priority'
import { useBoardStore } from '../../stores/useBoardStore'
import { useRef, useState } from 'react'
import { teamMembers } from '../ui/Header'
import type { CardProps } from '../../types/CardProps'

const priorityOptions: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Baixo', color: '#32d74b' },
  { value: 'medium', label: 'Médio', color: '#ffd60a' },
  { value: 'high', label: 'Alto', color: '#ff9500' },
  { value: 'critical', label: 'Crítico', color: '#ff3b30' },
]

export default function CreateCardModal({ columnId, onClose, onConfirm, columns }) {
  const [selectedColumn, setSelectedColumn] = useState<string>(columnId)
  const [priority, setPriority] = useState<string>('low')
  const [tags, setTags] = useState<string[]>([])
  const tagInputRef = useRef<HTMLInputElement>(null)

  function addTags() {
    const input = tagInputRef.current

    if (!input.value.trim()) return

    const formattdTag = input.value.trim().toLocaleLowerCase().replace(/\s+/g, '-')

    if (tags.includes(formattdTag)) {
      input.value = ''
      return
    }

    setTags((prev) => [...prev, formattdTag])

    input.value = ''
  }

  function deleteTag(tagToRemove: string) {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    if (!formData.get('title')) return

    const newCard: CardProps = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      priority: priority as Priority,
      tags: tags,
      assignee: 'HS',
      assigneeColor: '#0a84ff',
      dueDate: formData.get('dueDate') as string,
      columnId: selectedColumn,
      createdAt: new Date().toISOString().split('T')[0],
      attachments: 0,
      comments: 0,
    }

    console.log(newCard)

    onConfirm(newCard)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg bg-[#111] border border-[#222] rounded-2xl shadow-2xl overflow-hidden mx-4">
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-white text-base font-semibold">Novo Card</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <form
          id="create-card"
          onSubmit={handleSubmit}
          className="px-6 py-5 flex flex-col gap-4 max-h-[80vh] overflow-y-auto"
        >
          {/* title */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5 font-medium">Titulo *</label>
            <input
              type="text"
              name="title"
              placeholder="Titulo do Card..."
              className="w-full bg-[#161616] border border-[#282828] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors"
              autoFocus
            />
          </div>

          {/* description  */}
          <div>
            <label className="block text-xs text-[#666] mb-1.5 font-medium">Descrição</label>
            <textarea
              placeholder="Descreva a tarefa..."
              name="description"
              rows={3}
              className="w-full bg-[#161616] border border-[#282828] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors resize-none"
            />
          </div>

          {/* grid priority + column */}
          <div className="grid grid-cols-2 gap-3">
            {/* priority */}
            <div>
              <label className="flex items-center gap-1.5 text-xs text-[#666] mb-1.5 font-medium">
                <Flag size={11} />
                Prioridade
              </label>
              <div className="flex flex-col gap-1">
                {priorityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPriority(opt.value)}
                    type="button"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors border border-[#222]"
                    style={{
                      backgroundColor: priority === opt.value ? `${opt.color}15` : 'transparent',
                      border: `1px solid ${priority === opt.value ? `${opt.color}40` : '#222'}`,
                      color: priority === opt.value ? opt.color : '#666',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: opt.color,
                      }}
                    />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* column */}
            <div>
              <label className="block text-xs text-[#666] mb-1.5 font-medium">Coluna</label>
              <div className="flex flex-col gap-1">
                {columns.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedColumn(col.id)}
                    type="button"
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-colors"
                    style={{
                      // Estilos condicionais no BOTÃO (fundo suave + borda colorida quando selecionado)
                      backgroundColor: selectedColumn === col.id ? `${col.color}15` : 'transparent',
                      border: `1px solid ${selectedColumn === col.id ? `${col.color}40` : '#222'}`,
                      color: selectedColumn === col.id ? col.color : '#666',
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        // Cor SÓLIDA no span — sempre mostra a cor da coluna
                        backgroundColor: col.color,
                      }}
                    />
                    <span className="truncate">{col.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* assignee */}

          <div>
            <label className="flex items-center gap-1.5 text-xs text-[#666] mb-1.5 font-medium">
              <User size={11} />
              Responsável
            </label>
            <div className="flex gap-2 flex-wrap">
              {teamMembers.map((member) => (
                <button
                  key={member.initials}
                  type="button"
                  title={member.name}
                  className="relative"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white transition-transform hover:scale-110"
                    style={{
                      backgroundColor: member.color,
                    }}
                  >
                    {member.initials}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs text-[#666] mb-1.5 font-medium">
              <Calendar size={11} />
              Data de entrega
            </label>
            <input
              type="date"
              name="dueDate"
              className="w-full bg-[#161616] border border-[#282828] rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#444] transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-1.5 text-xs text-[#666] mb-1.5 font-medium">
              <Tag size={11} />
              Tags
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-[#888] bg-border border border-[#2a2a2a]"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => deleteTag(tag)}
                    className="text-[#555] hover:text-[#ff3b30] transition-colors ml-0.5"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                ref={tagInputRef}
                placeholder="nova-tag..."
                className="flex-1 bg-[#161616] border border-[#282828] rounded-lg px-3 py-2 text-white text-xs placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors"
              />
              <button
                type="button"
                onClick={() => addTags()}
                className="px-3 py-2 rounded-lg bg-border border border-[#282828] text-[#888] hover:text-white hover:border-[#333] transition-colors"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>
        </form>
        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-3 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white hover:bg-border transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="create-card"
            className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-[#e0e0e0] transition-colors"
          >
            Criar card
          </button>
        </div>
      </div>
    </div>
  )
}
