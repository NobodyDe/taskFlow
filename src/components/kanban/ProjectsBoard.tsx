import {
  ActivityIcon,
  Calendar,
  Check,
  Edit2,
  Folder,
  MoreVertical,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import type { Project } from '../../types/Project'
import { useState } from 'react'
import { teamMembers } from '../ui/Header'
import { useProjects } from '../../hooks/queries/useProjects'
import { useUser } from '../../hooks/queries/useUser'

const mockMembers = ['LM', 'CT']

const mockProjects = [
  {
    id: '1',
    name: 'Dashboard v2.0',
    description: 'Complete redesign of the main dashboard with new features',
    color: '#0a84ff',
    icon: 'rocket',

    created_at: '2026-04-01',
    members: ['LM', 'CT'],
    tasksCount: 14,
    activeTasksCount: 8,
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'iOS and Android native applications',
    color: '#bf5af2',
    icon: 'palette',

    created_at: '2026-03-15',
    members: ['LM', 'CT'],
    tasksCount: 23,
    activeTasksCount: 12,
  },
  {
    id: '3',
    name: 'API Redesign',
    description: 'RESTful API v3 with GraphQL support',
    color: '#ff9500',
    icon: 'code',
    members: ['LM', 'CT'],
    created_at: '2026-05-01',

    tasksCount: 9,
    activeTasksCount: 2,
  },
]

interface projectsCardProps {
  project: Partial<Project>
}

function ProjectCard({ project }: projectsCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [nameInput, setNameInput] = useState(project.name)
  const [descriptionInput, setDescriptionInput] = useState(project.description)

  function handleCancel() {
    setNameInput(project.name)
    setDescriptionInput(project.description)
    setIsEditing(false)
  }

  function handleSubmit() {
    const cleanedName = nameInput.trim()
    const cleanedDescription = descriptionInput.trim()

    if (!cleanedName) {
      alert('o nome do projeto não pode estar vazio')
      return
    }

    if (cleanedName === project.name && cleanedDescription === project.description) {
      setIsEditing(false)
      return
    }

    const payload = {
      id: project.id,
      name: cleanedName,
      description: cleanedDescription,
    }
  }

  return (
    <div
      key={project.id}
      className="group bg-[#0d0d0d] border border-[#1a1a1a] hover:border-[#282828] rounded-xl transition-all"
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${project.color_hex}15` }}
          >
            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: project.color_hex }} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            {isEditing ? (
              <div className="flex flex-col items-center gap-2 mb-2">
                <div className="flex flex-col w-full gap-2">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="flex-1 bg-[#111] border border-[#333] rounded-lg px-3 py-1.5 text-white text-base font-medium focus:outline-none focus:border-[#444]"
                    autoFocus
                  />
                  <textarea
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    rows={6}
                    className="bg-[#111] border border-[#282828] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#444] transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSubmit()}
                    className="p-1.5 rounded-lg bg-[#32d74b] hover:bg-[#2ac043] text-white transition-colors"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => handleCancel()}
                    className="p-1.5 rounded-lg bg-[#1a1a1a] hover:bg-[#222] text-[#888] hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <h3 className="text-white text-base font-medium mb-1 truncate">{project.name}</h3>
            )}

            {/* Description */}
            <p className="text-[#666] text-sm mb-4 line-clamp-2">{project.description}</p>

            {/* Stats */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ActivityIcon className="text-[#555]" />
                <span className="text-xs text-[#888]">{project.tasksCount} tarefas</span>
              </div>

              <div className="flex items-center gap-2">
                <Users size={14} className="text-[#555]" />
                <div className="flex items-center -space-x-1.5">
                  {mockMembers.slice(0, 3).map((initials) => {
                    const member = teamMembers.find((m) => m.initials === initials)
                    return (
                      <div
                        key={initials}
                        className="w-5 h-5 rounded-full border-2 border-[#0d0d0d] flex items-center justify-center text-[8px] font-semibold text-white"
                        style={{ backgroundColor: member?.color }}
                        title={member?.name}
                      >
                        {initials}
                      </div>
                    )
                  })}
                  {/* {project.members.length > 3 && (
                    <div className="w-5 h-5 rounded-full border-2 border-[#0d0d0d] bg-[#1a1a1a] flex items-center justify-center text-[8px] text-[#666]">
                      +{project.members.length - 3}
                    </div>
                  )} */}
                </div>
              </div>

              {project.created_at && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#555]" />
                  <span className="text-xs text-[#888]">
                    {new Date(project.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-[#555] hover:text-white hover:bg-[#1a1a1a] opacity-0 group-hover:opacity-100 transition-all"
            >
              <MoreVertical size={16} />
            </button>

            {isMenuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-10 z-20 w-44 bg-[#1a1a1a] border border-[#282828] rounded-xl shadow-2xl overflow-hidden">
                  <button
                    onClick={() => {
                      setIsEditing(true)
                      setMenuOpen(false)
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-white hover:bg-[#222] transition-colors"
                  >
                    <Edit2 size={14} className="text-[#888]" />
                    Renomear
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm text-[#ff3b30] hover:bg-[#ff3b30]/10 transition-colors">
                    <Trash2 size={14} />
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 pt-4 border-t border-[#1a1a1a]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#666]">Progresso</span>
            <span className="text-xs font-medium text-[#888]">
              {project.tasksCount > 0
                ? Math.round(
                    ((project.tasksCount - project.activeTasksCount) / project.tasksCount) * 100
                  )
                : 0}
              %
            </span>
          </div>
          <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width:
                  project.tasksCount > 0
                    ? `${Math.round(
                        ((project.tasksCount - project.activeTasksCount) / project.tasksCount) * 100
                      )}%`
                    : '0%',
                backgroundColor: project.color,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectsBoard() {
  const { data: projects, isLoading } = useProjects()
  const { data: user } = useUser()

  return (
    <section className="bg-background flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-8 pt-8 pb-6 border-b border-[#1a1a1a]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-2xl font-semibold tracking-tight mb-1">{`Olá ${user.first_name}`}</h1>
            <p className="text-[#666] text-sm">No que vamos trabalhar hoje?</p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e8e8e8] rounded-lg text-black text-sm font-semibold transition-colors">
            <Plus size={16} />+ Projeto
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#444]" />
          <input
            type="text"
            placeholder="Buscar projetos..."
            className="w-full h-10 bg-secondary border border-[#1e1e1e] rounded-lg pl-10 pr-4 text-white text-sm placeholder-[#444] focus:outline-none focus:border-[#333] transition-colors"
          />
        </div>
      </header>

      {/* content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {/* not found  */}
        {/* <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Folder size={24} className="text-[#444]" />
          </div>
          <h3 className="text-white text-lg font-medium mb-2">Nenhum projeto encontrado</h3>
          <p className="text-[#666] text-sm mb-6 max-w-sm">
            Crie seu primeiro projeto para começar a organizar suas tarefas
          </p>

          <button className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-[#e8e8e8] rounded-lg text-black text-sm font-semibold transition-colors">
            <Plus size={16} />
            Criar Projeto
          </button>
        </div> */}

        <div className="grid grid-cols-1 gap-3 max-w-4xl">
          {projects?.map((project) => (
            <ProjectCard project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
