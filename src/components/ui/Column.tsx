import { MoreHorizontal, Pen, Plus, Trash2, X } from 'lucide-react'
import Card from './Card'

import { useState } from 'react'
import { useBoardStore } from '../../stores/useBoardStore'

import CreateCardModal from '../modal/CreateCardModal'
import CardModal from '../modal/CardDetailModal'
import DeleteConfirmModal from '../modal/DeleteConfirmModal'
import { CreateColumnModal } from '../modal/CreateColumnModal'
import { useColumns } from '../../hooks/queries/useColumns'
import ColumnContent from './ColumnContent'

// modal create Column

function ColumnHeader({ id, title, color }) {
  const [isEdit, setEditOpen] = useState(false)
  const [columnModal, setColumnModal] = useState(null)
  const [isDeleteModal, setIsDeleteModal] = useState(false)

  const dispatch = useBoardStore((s) => s.dispatch)

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
          {/* {cardIds.length} */}
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
          initialTitle={title}
          initialColor={color}
          onClose={() => setColumnModal(false)}
          onConfirm={(data) =>
            dispatch({
              type: 'column/update',
              payload: {
                columnId: id,
                data: {
                  title: data.title,
                  color: data.color,
                },
              },
            })
          }
        />
      )}
      {isDeleteModal && (
        <DeleteConfirmModal
          columnId={id}
          onClose={() => setIsDeleteModal(false)}
          onConfirm={() =>
            dispatch({
              type: 'column/delete',
              payload: {
                columnId: id,
              },
            })
          }
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
  const { cards, dispatch } = useBoardStore()
  const { data: columns, isLoading, isError } = useColumns()

  if (isLoading) return <div>Carregando...</div> // ou um skeleton
  if (isError) return <div>Erro ao carregar colunas</div>
  if (!columns) return null

  console.log(columns)

  return (
    <div className="flex gap-6">
      <CardModal />
      {columns.map(({ id, name, color_hex }) => (
        <div key={id} className="flex flex-col shrink-0 w-72">
          {/* column header */}
          <ColumnHeader id={id} title={name} color={color_hex} />

          {/* linha */}
          <div
            className="h-px mb-3 mx-1 rounded-full"
            style={{ backgroundColor: color_hex, opacity: 0.4 }}
          />
          {/* card */}
          <div className="flex flex-col gap-3">
            <ColumnContent columnId={id} />
          </div>
          <button
            onClick={() => setCardModalColumnId(id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[#444] hover:text-[#888] hover:bg-[#151515] transition-colors text-xs font-medium cursor-pointer"
          >
            <Plus size={12} />
            Adicionar card
          </button>
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
          onConfirm={(data) =>
            dispatch({
              type: 'column/create',
              payload: {
                column: {
                  id: crypto.randomUUID(),
                  title: data.title,
                  color: data.color,
                  cardIds: [],
                },
              },
            })
          }
        />
      )}
      {cardModalColumnId && (
        <CreateCardModal
          columnId={cardModalColumnId}
          columns={columns}
          onClose={() => setCardModalColumnId(null)}
          onConfirm={(data) =>
            dispatch({
              type: 'card/create',
              payload: {
                columnId: cardModalColumnId,
                data: data,
              },
            })
          }
        />
      )}
    </div>
  )
}
