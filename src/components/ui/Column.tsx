import { MoreHorizontal, Plus, Trash2 } from 'lucide-react'
import Card from './Card'
import { initialCards } from '../../initialValue'
import { useState } from 'react'

const initialColumn = [
  {
    id: 'backlog',
    title: 'Backlog',
    color: '#555555',
    cardIds: ['c1', 'c2', 'c3'],
  },
  {
    id: 'todo',
    title: 'To Do',
    color: '#0a84ff',
    cardIds: ['c4', 'c5', 'c6'],
    wipLimit: 5,
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#ff9500',
    cardIds: ['c7', 'c8', 'c9'],
    wipLimit: 3,
  },
  {
    id: 'review',
    title: 'Review',
    color: '#bf5af2',
    cardIds: ['c10', 'c11'],
  },
  {
    id: 'done',
    title: 'Done',
    color: '#32d74b',
    cardIds: ['c12', 'c13', 'c14'],
  },
]

interface CreateColumnModalProps {
  onClose: () => void
}

// modal create Column

function CreateColumnModal({ onClose }: CreateColumnModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white hover:bg-[#1e1e1e] transition-colors"
          >
            Cancelar
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-[#e0e0e0] transition-colors">
            Criar
          </button>
        </div>
      </div>
    </div>
  )
}

function ColumnHeader({ title, color, cardIds }) {
  const [isEdit, setEditOpen] = useState(false)
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex items-center gap-2.5">
        {/* Color dot */}
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
        <span className="text-white text-sm font-semibold">{title}</span>
        {/* Count */}
        <span
          className="px-1.5 py-0.5 rounded text-xs font-medium"
          style={{
            backgroundColor: color,
          }}
        >
          {cardIds.length}
        </span>
      </div>
      {/* column button */}

      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors cursor-pointer">
          <Plus size={14} />
        </button>
        <button
          onClick={() => setEditOpen((prev) => !prev)}
          className="relative p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors cursor-pointer"
        >
          <MoreHorizontal size={14} />
          {/* editOpen */}
          {isEdit && (
            <>
              <div className="fixed inset-0 z-10" />
              <div className="flex flex-col absolute right-0 top-8 z-20 w-44 bg-hover border border-[#282828] rounded-xl shadow-2xl overflow-hidden items-center">
                <button className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[#ff3b30] hover:bg-[#222] transition-colors">
                  <Trash2 size={13} />
                  Excluir coluna
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[#444] hover:bg-[#222] hover:text-[#888] transition-colors">
                  <Trash2 size={13} />
                  Renomear coluna
                </button>
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function Column() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="flex gap-6">
      {initialColumn.map(({ id, title, color, cardIds }) => (
        <div key={id} className="flex flex-col shrink-0 w-72">
          {/* column header */}
          <ColumnHeader title={title} color={color} cardIds={cardIds} />

          {/* linha */}
          <div
            className="h-px mb-3 mx-1 rounded-full"
            style={{ backgroundColor: color, opacity: 0.4 }}
          />
          {/* card */}
          <div className="flex flex-col gap-3">
            {cardIds.map((id) => {
              const card = initialCards[id]
              return <Card key={id} {...card} />
            })}
            {/* add card button */}
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#444] hover:text-[#888] hover:bg-[#151515] transition-colors text-xs font-medium cursor-pointer">
              <Plus size={12} />
              Adicionar card
            </button>
          </div>
        </div>
      ))}
      <div className="flex flex-col shrink-0 w-72">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-[#222] text-[#444] hover:text-[#888] hover:border-[#333] transition-colors text-sm cursor-pointer"
        >
          <Plus size={14} />
          Adicionar coluna
        </button>
      </div>
      {isModalOpen && <CreateColumnModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
}
