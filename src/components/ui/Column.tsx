import { MoreHorizontal, Pen, Plus, Trash2, X } from 'lucide-react'
import Card from './Card'

import { useState } from 'react'
import { useBoardStore } from '../../stores/useBoardStore'

import CreateCardModal from '../modal/CreateCardModal'
import CardModal from '../modal/CardDetailModal'
import DeleteConfirmModal from '../modal/DeleteConfirmModal'
import { CreateColumnModal } from '../modal/CreateColumnModal'

// modal create Column

type ColumnFormData = {
  id?: string
  title: string
  color: string
}

type ColumnAction =
  | {
      type: 'createColumn'
      payload: ColumnFormData
    }
  | {
      type: 'updateColumn'
      payload: {
        id: string
        data: ColumnFormData
      }
    }
  | {
      type: 'deleteColumn'
      payload: {
        id: string
      }
    }

function ColumnHeader({ id, title, color, cardIds }) {
  const [isEdit, setEditOpen] = useState(false)
  const [columnModal, setColumnModal] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const { deleteColumn, updateColumn } = useBoardStore()

  function handleColumnAction(action: ColumnAction) {
    switch (action.type) {
      case 'updateColumn':
        updateColumn(id, action.payload.data)
        break

      case 'deleteColumn':
        deleteColumn(action.payload.id)
        break
    }
  }

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

      <div className="flex items-center gap-1 relative">
        <button className="p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors cursor-pointer">
          <Plus size={14} />
        </button>
        <button
          onClick={() => setEditOpen((prev) => !prev)}
          className="p-1.5 rounded-lg text-[#555] hover:text-white hover:bg-border transition-colors cursor-pointer"
        >
          <MoreHorizontal size={14} />
        </button>
        {/* editOpen */}
        {isEdit && (
          <>
            <div onClick={() => setEditOpen(false)} className="fixed inset-0 z-10" />
            <div className="flex flex-col absolute right-0 top-8 z-20 w-44 bg-hover border border-[#282828] rounded-xl shadow-2xl overflow-hidden items-center">
              <button
                onClick={() => {
                  setIsDeleteModal(true)
                  setEditOpen(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[#ff3b30] hover:bg-[#222] transition-colors"
              >
                <Trash2 size={13} />
                Excluir coluna
              </button>
              <button
                onClick={() => {
                  setColumnModal(true)
                  setEditOpen(false)
                }}
                className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-[#444] hover:bg-[#222] hover:text-[#888] transition-colors"
              >
                <Pen size={13} />
                Editar coluna
              </button>
            </div>
          </>
        )}
      </div>
      {columnModal && (
        <CreateColumnModal
          columnId={id}
          initialTitle={title}
          initialColor={color}
          onClose={() => setColumnModal(false)}
          onConfirm={(data) => handleColumnAction({ type: 'createColumn', payload: { id, data } })}
        />
      )}
      {isDeleteModal && (
        <DeleteConfirmModal
          columnId={id}
          onClose={() => setIsDeleteModal(false)}
          onConfirm={() => handleColumnAction({ type: 'deleteColumn', payload: { id } })}
          title="Tem certeza que deseja remover esta coluna?"
          description="todos os cards dela serão apagados"
        />
      )}
    </div>
  )
}

export default function Column() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [cardModalColumnId, setCardModalColumnId] = useState<string | null>(null)
  // const columns = useBoardStore((state) => state.columns)
  // const cards = useBoardStore((state) => state.cards)
  const { cards, columns, addColumn } = useBoardStore()

  function handleColumnCreate(payload: ColumnFormData) {
    addColumn({
      id: crypto.randomUUID(),
      title: payload.title,
      color: payload.color,
      cardIds: [],
    })
  }

  return (
    <div className="flex gap-6">
      <CardModal />
      {columns.map(({ id, title, color, cardIds }) => (
        <div key={id} className="flex flex-col shrink-0 w-72">
          {/* column header */}
          <ColumnHeader id={id} title={title} color={color} cardIds={cardIds} />

          {/* linha */}
          <div
            className="h-px mb-3 mx-1 rounded-full"
            style={{ backgroundColor: color, opacity: 0.4 }}
          />
          {/* card */}
          <div className="flex flex-col gap-3">
            {cardIds.map((id) => {
              const card = cards[id]
              if (!card) return null
              return <Card key={id} {...card} />
            })}
            {/* add card button */}
            <button
              onClick={() => setCardModalColumnId(id)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#444] hover:text-[#888] hover:bg-[#151515] transition-colors text-xs font-medium cursor-pointer"
            >
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
      {isModalOpen && (
        <CreateColumnModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={(data) => handleColumnCreate(data)}
        />
      )}
      {cardModalColumnId && (
        <CreateCardModal columnId={cardModalColumnId} onClose={() => setCardModalColumnId(null)} />
      )}
    </div>
  )
}
