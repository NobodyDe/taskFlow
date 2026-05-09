import { ActivityIcon, Edit3, MessageSquare, MoreVertical, X } from 'lucide-react'
import { useState } from 'react'
import { useBoardStore } from '../../stores/useBoardStore'
import type { CardProps } from '../../types/CardProps'
import Activity from '../common/Activity'
import AttachmentsModal from '../common/AttachmentsModal'
import CheckListModal from '../common/ChecklistModal'
import Comments from '../common/Comments'
import SidebarCardModal from '../common/SideBarCardModal'

type EditableField = 'title' | 'description'

type DraftState = Pick<CardProps, EditableField>

export default function CardModal() {
  const card = useBoardStore((s) => (s.selectedCardId ? s.cards[s.selectedCardId] : null))
  const setSelectedCardId = useBoardStore((s) => s.setSelectedCardId)
  const updateCard = useBoardStore((s) => s.updateCard)

  const [activeTab, setActiveTab] = useState<'comments' | 'activity'>('comments')
  const [editingField, setEditingField] = useState<EditableField | null>(null)
  const [draft, setDraft] = useState<DraftState>({
    title: '',
    description: '',
  })

  // useEffect(() => {
  //   if (!card) return
  //   setDraftDescription(card.description ?? '')
  //   setIsEditingDescription(false)
  //   setDraftTitle(card.title ?? '')
  //   setIsEditingTitle(false)
  // }, [card?.id, card?.description])

  if (!card) return null

  function startEdit(field: EditableField) {
    setDraft({
      title: card.title ?? '',
      description: card.description ?? '',
    })
    setEditingField(field)
  }

  function cancelEdit() {
    setEditingField(null)
  }

  function onDraftChange(field: EditableField, value: string) {
    setDraft((prev) => ({ ...prev, [field]: value }))
  }

  function saveField(field: EditableField) {
    const currentValue = (card[field] ?? '') as string
    const nextValue = (draft[field] ?? '').trim()

    if (field === 'title' && !nextValue) return

    if (nextValue === currentValue) {
      setEditingField(null)
      return
    }
    updateCard(card.id, { [field]: nextValue } as Partial<CardProps>)
    setEditingField(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={() => setSelectedCardId(null)}
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
      />
      {/* content */}
      <div className="relative w-full max-w-5xl h-[90vh] bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* header */}
          <div className="shrink-0 flex items-start justify-between px-8 pt-6 pb-4 border-b border-hover">
            <div className="flex-1 mr-4">
              {editingField === 'title' ? (
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => onDraftChange('title', e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveField('title')
                    if (e.key === 'Escape') cancelEdit()
                  }}
                  className="w-full bg-transparent border-b-2 border-[#0a84ff] text-white text-2xl font-semibold focus:outline-none pb-1"
                />
              ) : (
                <h2 className="text-white text-2xl font-semibold cursor-text hover:text-[#e0e0e0] transition-colors pb-1 group flex items-center gap-2">
                  {card.title}
                  <Edit3
                    size={16}
                    onClick={() => startEdit('title')}
                    className="opacity-0 group-hover:opacity-50 transition-opacity cursor-pointer"
                  />
                </h2>
              )}

              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-[#666]">
                  em {card.columnId}
                  <span className="font-medium"></span>
                </span>
                <span className="text-[#333]">•</span>
                <span className="text-xs text-[#666]">Criado em {card.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-hover transition-colors">
                <MoreVertical size={16} />
              </button>
              <button
                onClick={() => setSelectedCardId(null)}
                className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-hover transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          {/* body */}
          <div className="flex-1 overflow-y-auto px-8 py-6">
            {/* descrition */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-white">Descrição</h3>
                <button
                  onClick={() => startEdit('description')}
                  className="text-xs text-[#666] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Edit3 size={12} />
                  Editar
                </button>
              </div>
              {editingField === 'description' ? (
                <div>
                  <textarea
                    value={draft.description}
                    onChange={(e) => onDraftChange('description', e.target.value)}
                    rows={6}
                    className="w-full bg-[#111] border border-[#282828] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#444] transition-colors resize-none"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => saveField('description')}
                      className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-semibold hover:bg-[#e0e0e0] transition-colors"
                    >
                      Salvar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#666] hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-[#aaa] leading-relaxed whitespace-pre-wrap">
                    {card.description || <span className="text-[#444] italic">Sem descrição</span>}
                  </p>
                </div>
              )}
            </div>
            <CheckListModal />
            <AttachmentsModal />
            {/* comments and activity */}
            <div>
              <div className="flex items-center gap-1 mb-4 border-b border-[#1a1a1a]">
                <button
                  onClick={() => setActiveTab('comments')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'comments'
                      ? 'text-white border-white'
                      : 'text-[#666] border-transparent hover:text-[#aaa]'
                  }`}
                >
                  <MessageSquare size={14} />
                  Comentários
                  <span className="px-1.5 py-0.5 rounded bg-[#1a1a1a] text-xs">{3}</span>
                </button>
                <button
                  onClick={() => setActiveTab('activity')}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === 'activity'
                      ? 'text-white border-white'
                      : 'text-[#666] border-transparent hover:text-[#aaa]'
                  }`}
                >
                  <ActivityIcon size={14} />
                  Atividade
                </button>
              </div>
              {activeTab === 'comments' ? <Comments /> : <Activity />}
            </div>
          </div>
        </div>
        <SidebarCardModal />
      </div>
    </div>
  )
}
