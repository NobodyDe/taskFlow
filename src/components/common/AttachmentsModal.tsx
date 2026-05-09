import { Download, FileIcon, ImageIcon, LinkIcon, Paperclip, Plus } from 'lucide-react'
import { useState } from 'react'

interface Attachment {
  id: string
  name: string
  type: 'image' | 'document' | 'link'
  size?: string
  url?: string
  uploadedBy: string
  uploadedAt: string
}

export default function AttachmentsModal() {
  const [attachments, setAttachments] = useState<Attachment[]>([
    {
      id: 'att1',
      name: 'query-analysis.pdf',
      type: 'document',
      size: '2.4 MB',
      uploadedBy: 'RK',
      uploadedAt: '2026-04-20',
    },
    {
      id: 'att2',
      name: 'performance-before.png',
      type: 'image',
      size: '856 KB',
      uploadedBy: 'RK',
      uploadedAt: '2026-04-22',
    },
    {
      id: 'att3',
      name: 'Documentação oficial PostgreSQL',
      type: 'link',
      url: 'https://postgresql.org/docs',
      uploadedBy: 'AM',
      uploadedAt: '2026-04-23',
    },
  ])

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Paperclip size={14} className="text-white" />
          <h3 className="text-sm font-medium text-white">Anexos</h3>
          <span className="text-xs text-[#666]">{attachments.length}</span>
        </div>
        <button className="text-xs text-[#666] hover:text-white transition-colors flex items-center gap-1">
          <Plus size={12} />
          Adicionar
        </button>
      </div>
      <div className="space-y-2">
        {attachments.map((att) => {
          const Icon = att.type === 'image' ? ImageIcon : att.type === 'link' ? LinkIcon : FileIcon

          return (
            <div
              key={att.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-[#111] border border-[#1a1a1a] hover:border-[#282828] transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#888]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{att.name}</p>
                <p className="text-xs text-[#555]">
                  {att.size && `${att.size} • `}Adicionado por {att.uploadedBy} em {att.uploadedAt}
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-[#888] hover:text-white hover:bg-[#1a1a1a] transition-all">
                <Download size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
