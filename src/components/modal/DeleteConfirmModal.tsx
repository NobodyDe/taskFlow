import { Trash2 } from 'lucide-react'
import { typograph } from '../ui/typograph'

export default function DeleteConfirmModal({ onClose, onConfirm, title, description }: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
      />
      <form className="relative w-80 bg-[#111] border border-[#222] rounded-2xl shadow-2xl p-6 flex flex-col gap-1">
        <h1 className={typograph({})}>{title}</h1>

        <span className={typograph({ size: 'xs', color: 'detail' })}>{description}</span>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer flex-1 px-4 py-2 rounded-lg text-sm text-[#666] hover:text-white hover:bg-[#1e1e1e] transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={onConfirm}
            className="flex-1 flex gap-2 justify-center px-4 py-2 rounded-lg bg-[#ff3b30] text-foregroud text-sm font-semibold hover:bg-[#53130f] transition-colors items-center cursor-pointer"
          >
            <Trash2 size={13} />
            Remover
          </button>
        </div>
      </form>
    </div>
  )
}
