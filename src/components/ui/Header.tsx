import { ChevronDown, Filter, Menu, Plus, Search } from 'lucide-react'
import { typograph } from './typograph'
import { useState } from 'react'
import { useSidebarStore } from '../../stores/useSidebarStore'

const filterOptions: { value: string; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'critical', label: 'Crítico' },
  { value: 'high', label: 'Alto' },
  { value: 'medium', label: 'Médio' },
  { value: 'low', label: 'Baixo' },
]

export const teamMembers = [
  { initials: 'AM', name: 'Ana Martins', color: '#0a84ff', role: 'Product Designer' },
  { initials: 'JS', name: 'João Silva', color: '#bf5af2', role: 'Frontend Dev' },
  { initials: 'RK', name: 'Rafael Kosta', color: '#ff9500', role: 'Backend Dev' },
  { initials: 'LM', name: 'Luana Melo', color: '#32d74b', role: 'QA Engineer' },
  { initials: 'CT', name: 'Carlos Torres', color: '#ff3b30', role: 'DevOps' },
]

export default function Header() {
  const [filterOpen, setOpenFilter] = useState(false)
  const [filterPriority, setFilterPriority] = useState('all')

  const selectedFilter = filterOptions.find((f) => f.value === filterPriority)

  const toggleSidebar = useSidebarStore((state) => state.toggleSidebarOpen)

  return (
    <header className="flex items-center gap-4 h-22 px-8 justify-between border-b border-border">
      <div className="flex gap-4 items-center">
        <button
          onClick={() => toggleSidebar()}
          className="text-[#444] cursor-pointer rounded-lg p-2 hover:text-[#888] hover:bg-border transition-colors "
        >
          <Menu size={16} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className={typograph({ size: 'xs', color: 'detail' })}>Projetos</span>
            <span className={typograph({ size: 'xs', color: 'detail' })}>/</span>
            <span className={typograph({ size: 'detail' })}>Dashboard v2.0</span>
          </div>
          <span className={typograph({ size: 'xs', color: 'sub' })}>
            Sprint 4 • Atualizado hoje
          </span>
        </div>
      </div>

      {/* search */}
      <div className="flex gap-4 items-center">
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Buscar cards..."
            className="pl-8 pr-3 py-2 bg-[#111] border border-border rounded-lg text-white text-xs placeholder-[#3a3a3a] focus:outline-none focus:border-[#333] w-44 transition-all focus:w-56"
          />
        </div>

        {/* filter */}
        <div className="relative">
          <button
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs border border-border text-[#888] transition-colors ${filterPriority !== 'all' ? 'text-white bg-[#252525]' : 'text-[#888] bg-[#111] hover:text-white hover:border-[#888] '}`}
            onClick={() => setOpenFilter((prev) => !prev)}
          >
            <Filter size={12} />
            {selectedFilter.label}
            <ChevronDown size={11} />
            {filterOpen && (
              <div
                className="absolute right-0 top-9 z-20 w-36 bg-hover border border-[#282828] rounded-xl shadow-2xl overflow-hidden"
                onClick={() => setOpenFilter((prev) => !prev)}
              >
                {filterOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setFilterPriority(opt.value)
                      setOpenFilter((prev) => !prev)
                    }}
                    className={`flex items-center w-full px-3 py-2 text-xs transition-colors ${
                      filterPriority === opt.value
                        ? 'text-white bg-[#252525]'
                        : 'text-[#888] hover:text-white hover:bg-[#222]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* team */}
        <div className="flex items-center -space-x-2">
          {teamMembers.map((m) => (
            <div
              key={m.initials}
              className="w-7 h-7 rounded-full border-2 border-[#080808] flex items-center justify-center text-[10px] font-semibold text-foreground"
              style={{ backgroundColor: m.color }}
            >
              {m.initials}
            </div>
          ))}
          <div className="w-7 h-7 rounded-full border-2 border-[#080808] bg-border flex items-center justify-center text-[10px] text-[#666]">
            +1
          </div>
        </div>

        {/* add card */}
        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-black bg-foreground font-semibold text-xs hover:bg-[#e8e8e8] transition-colors cursor-pointer">
          <Plus size={18} />
          Novo Card
        </button>
      </div>
    </header>
  )
}
