import { AlertTriangle, CheckCircle2, Clock, ListTodo } from 'lucide-react'
import { typograph } from './typograph'

export default function () {
  return (
    <div className="flex items-center gap-3 h-20 px-6 justify-between border-b border-border">
      {[
        {
          icon: ListTodo,
          label: 'Total de Cards',
          value: 18,
          color: '#888',
        },
        {
          icon: Clock,
          label: 'Em Andamento',
          value: 8,
          color: '#ff9500',
        },
        {
          icon: CheckCircle2,
          label: 'Concluídos',
          value: 5,
          color: '#32d74b',
        },
        {
          icon: AlertTriangle,
          label: 'Atrasados',
          value: 5,
          color: '#ff3b30',
        },
      ].map(({ icon: Icon, label, color, value }) => (
        <div
          key={label}
          className="flex items-center gap-3 py-2 px-4 rounded-lg bg-secondary border border-[#181818]"
        >
          <Icon size={14} style={{ color }} />
          <div className="flex gap-2 items-center">
            <span className={typograph({ size: 'detail' })}>{value}</span>
            <span className={typograph({ size: 'xs', color: 'detail' })}>{label}</span>
          </div>
        </div>
      ))}
      {/* progress */}
      <div className="ml-auto flex items-center gap-3 min-w-48">
        <span className="text-[#555] text-xs whitespace-nowrap">Progresso sprint</span>
        <div className="flex-1 h-1.5 bg-hover rounded-full overflow-hidden">
          <div
            className="h-full bg-[#32d74b] rounded-full transition-all duration-500"
            style={{ width: 23 }}
          />
        </div>
        <span className="text-white text-xs font-medium whitespace-nowrap">23%</span>
      </div>
    </div>
  )
}
