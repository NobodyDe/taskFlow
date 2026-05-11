import { Check, CheckSquare, Plus, Square, X } from 'lucide-react'
import { useState } from 'react'

interface Checklist {
  id: string
  text: string
  completed: boolean
}

export default function CheckListModal() {
  const [checklist, setChecklist] = useState<Checklist[]>([
    { id: 'check1', text: 'Analisar queries mais lentas no New Relic', completed: true },
    { id: 'check2', text: 'Adicionar índices compostos nas tabelas principais', completed: true },
    { id: 'check3', text: 'Otimizar JOINs desnecessários', completed: true },
    { id: 'check4', text: 'Testar performance em ambiente de staging', completed: false },
    { id: 'check5', text: 'Documentar mudanças no Confluence', completed: false },
  ])

  const completedChecklist = checklist.filter((c) => c.completed).length
  const totalChecklist = checklist.length
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <CheckSquare size={14} className="text-white" />
          <h3 className="text-sm font-medium text-white">Checklist</h3>
          {totalChecklist > 0 && (
            <span className="text-xs text-[#666]">
              {completedChecklist}/{totalChecklist}
            </span>
          )}
        </div>
        {totalChecklist > 0 && (
          <span className="text-xs font-medium text-[#888]">{Math.round(checklistProgress)}%</span>
        )}
      </div>

      {totalChecklist > 0 && (
        <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#32d74b] rounded-full transition-all duration-500"
            style={{ width: `${checklistProgress}%` }}
          />
        </div>
      )}

      <div className="space-y-2 mb-3">
        {checklist.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-2.5 rounded-lg bg-[#111] border border-[#1a1a1a] hover:border-[#282828] transition-colors group"
          >
            <button className="shrink-0">
              {item.completed ? (
                <div className="w-4 h-4 rounded bg-[#32d74b] flex items-center justify-center">
                  <Check size={12} className="text-black" />
                </div>
              ) : (
                <Square size={16} className="text-[#555] hover:text-[#888] transition-colors" />
              )}
            </button>
            <span
              className={`flex-1 text-sm ${
                item.completed ? 'text-[#555] line-through' : 'text-[#ccc]'
              }`}
            >
              {item.text}
            </span>
            <button className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-[#ff3b30] transition-all">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Adicionar item..."
          className="flex-1 bg-[#111] border border-border rounded-lg px-3 py-2 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#333] transition-colors"
        />
        <button className="px-4 py-2 rounded-lg bg-hover border border-[#282828] text-white hover:bg-[#222] transition-colors">
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}
