import { Form, MoreHorizontal, Pen, Plus, Trash2, X } from 'lucide-react'
import Card from './Card'
import { initialCards, initialColumn } from '../../initialValue'
import { useState } from 'react'
import { useBoardStore } from '../../stores/useBoardStore'

interface CreateColumnModalProps {
  onClose: () => void
}

const colors: string[] = [
  '#0a84ff',
  '#bf5af2',
  '#ff9500',
  '#32d74b',
  '#ff3b30',
  '#ffd60a',
  '#5e5ce6',
  '#ff6961',
]

// modal create Column

function CreateColumnModal({ onClose }: CreateColumnModalProps) {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const addColum = useBoardStore((state) => state.addColumn)
  function createColumn(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    const { title } = Object.fromEntries(new FormData(e.currentTarget))

    if (!title) return

    addColum({
      id: crypto.randomUUID(),
      title: String(title),
      color: selectedColor,
      cardIds: [],
    })
    onClose()
  }

  // console.log(selectedColor)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <form
        onSubmit={createColumn}
        className="relative w-80 bg-[#111] border border-[#222] rounded-2xl shadow-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-sm font-semibold">Nova Coluna</h3>
          <button onClick={onClose} className="text-[#555] hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-xs text-[#666] mb-1.5 font-medium">Nome da coluna</label>
          <input
            type="text"
            name="title"
            placeholder="Ex: Em Teste..."
            className="w-full bg-[#161616] border border-[#282828] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3a3a3a] focus:outline-none focus:border-[#444] transition-colors"
            autoFocus
          />
        </div>
        <div className="mb-5">
          <label className="block text-xs text-[#666] mb-2 font-medium">Cor</label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((cor) => (
              <button
                key={cor}
                type="button"
                name="color"
                onClick={() => setSelectedColor(cor)}
                className={`rounded-full p-3 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  selectedColor === cor ? 'outline outline-2 outline-offset-2' : ''
                }`}
                style={{
                  backgroundColor: cor,
                  outlineColor: cor,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white hover:bg-[#1e1e1e] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-[#e0e0e0] transition-colors"
          >
            Criar
          </button>
        </div>
      </form>
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
                  <Pen size={13} />
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
  const columns = useBoardStore((state) => state.columns)
  return (
    <div className="flex gap-6">
      {columns.map(({ id, title, color, cardIds }) => (
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
