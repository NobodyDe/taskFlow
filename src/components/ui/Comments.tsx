import { MoreVertical, Send } from 'lucide-react'
import { useState } from 'react'
import { teamMembers } from '../ui/Header'

interface Comment {
  id: string
  author: string
  authorColor: string
  content: string
  timestamp: string
  edited?: boolean
}

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'comm1',
      author: 'RK',
      authorColor: '#ff9500',
      content:
        'Pessoal, consegui reduzir o tempo de resposta em 40% otimizando os índices. Vou subir um PR com as mudanças.',
      timestamp: '2026-05-05T14:23:00',
    },
    {
      id: 'comm2',
      author: 'LM',
      authorColor: '#32d74b',
      content:
        'Ótimo trabalho! Rodei os testes de performance aqui e realmente melhorou bastante. Aprovado.',
      timestamp: '2026-05-05T15:10:00',
      edited: true,
    },
    {
      id: 'comm3',
      author: 'AM',
      authorColor: '#0a84ff',
      content:
        'Só lembrando que precisamos documentar essas queries otimizadas antes de fazer merge.',
      timestamp: '2026-05-06T09:15:00',
    },
  ])
  return (
    <div>
      {/* Comment Input */}
      <div className="mb-6">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0a84ff] flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            AM
          </div>
          <div className="flex-1">
            <textarea
              placeholder="Escreva um comentário..."
              rows={3}
              className="w-full bg-[#111] border border-[#282828] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#444] transition-colors resize-none mb-2"
            />
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-[#e0e0e0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send size={12} />
              Comentar
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => {
          const author = teamMembers.find((m) => m.initials === comment.author)

          return (
            <div key={comment.id} className="flex gap-3 group">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                style={{ backgroundColor: comment.authorColor }}
              >
                {comment.author}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {author?.name || comment.author}
                  </span>
                  <span className="text-xs text-[#555]">{comment.timestamp}</span>
                  {comment.edited && <span className="text-xs text-[#444] italic">(editado)</span>}
                </div>
                <p className="text-sm text-[#ccc] leading-relaxed">{comment.content}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-[#555] hover:text-white transition-all">
                <MoreVertical size={14} />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
