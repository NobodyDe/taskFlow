import { LogOut } from 'lucide-react'
import { typograph } from '../ui/typograph'

import { useAuthStore } from '../../stores/useAuthStore'

export default function UserAvatar({ isCollapsed }) {
  const { user } = useAuthStore()

  return (
    <div className="flex items-center gap-3 px-3 py-4 border-t border-border">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: user?.color_hex ?? '#888' }}
      >
        <span className="text-white text-xs font-semibold">{user?.initials}</span>
      </div>
      {!isCollapsed && (
        <>
          <div>
            <p className={typograph({ size: 'detail' })}>
              {[user?.first_name, user?.last_name].join(' ')}
            </p>
            <p className={typograph({ size: 'xs', color: 'detail' })}>{user?.position}</p>
          </div>
          <button className="text-[#444] hover:text-[#888] transition-colors ml-auto cursor-pointer">
            <LogOut size={14} />
          </button>
        </>
      )}
    </div>
  )
}
