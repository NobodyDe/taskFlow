import { MoreHorizontal, Plus } from 'lucide-react'
import Card from './Card'
import { initialCards } from '../../initialValue'

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

export default function Column() {
  return (
    <div className="flex gap-6">
      {initialColumn.map(({ id, title, color, cardIds }) => (
        <div key={id} className="flex flex-col shrink-0 w-72">
          {/* column header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5">
              {/* Color dot */}
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
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
              <button className="p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors cursor-pointer">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>
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
    </div>
  )
}
