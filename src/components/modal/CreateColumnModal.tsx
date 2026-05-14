import { X } from 'lucide-react'
import { useState } from 'react'

const colors: string[] = [
  '#0a84ff',
  '#bf5af2',
  '#ff9500',
  '#32d74b',
  '#ff3b30',
  '#ffd60a',
  '#5e5ce6',
  '#ff6961',
  '#555555',
]

interface CreateColumnModalProps {
  onClose: () => void
  initialTitle?: string
  initialColor?: string
  onConfirm?: (_data: { id?: string; title: string; color: string }) => void
}

export function CreateColumnModal({
  onClose,
  initialTitle,
  initialColor,
  onConfirm,
}: CreateColumnModalProps) {
  const [columnName, setColumName] = useState(initialTitle ?? '')
  const [selectedColor, setSelectedColor] = useState(initialColor ?? colors[0])

  //   const { addColumn, updateColumn } = useBoardStore()

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = {
      title: columnName.trim(),
      color: selectedColor,
    }

    onConfirm(data)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <form
        onSubmit={(e) => handleSubmit(e)}
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
            value={columnName}
            onChange={(e) => setColumName(e.target.value)}
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
                  selectedColor === cor ? 'outline-2 outline-offset-2' : ''
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
