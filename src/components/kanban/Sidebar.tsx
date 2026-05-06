import {
  BarChart2,
  Bell,
  ChevronDown,
  LayoutGrid,
  LogOut,
  Plus,
  Settings,
  Users,
  Zap,
} from 'lucide-react'
import { typograph } from '../ui/typograph'
import { useState } from 'react'
import { useSidebarStore } from '../../stores/useSidebarStore'

const navItems = [
  { icon: LayoutGrid, label: 'Board', active: true },
  { icon: BarChart2, label: 'Analytics', active: false },
  { icon: Users, label: 'Team', active: false },
  { icon: Settings, label: 'Settings', active: false },
]

const projects = [
  { id: 'p1', name: 'Dashboard v2.0', color: '#0a84ff', active: true },
  { id: 'p2', name: 'Mobile App', color: '#bf5af2', active: false },
  { id: 'p3', name: 'API Redesign', color: '#ff9500', active: false },
]

export function Sidebar() {
  const [projectsOpen, setProjectsOpen] = useState(true)
  const isSidebarCollapsed = useSidebarStore((state) => state.sidebarOpen)

  console.log(isSidebarCollapsed)

  return (
    <aside
      className={`flex flex-col bg-secondary min-h-screen border-r border-border transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
    >
      {/* logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center shrink-0">
          <Zap size={16} className="text-black" fill="black" />
        </div>
        {!isSidebarCollapsed && (
          <div>
            <h1 className={typograph({})}>TaskFlow</h1>
            <p className={typograph({ size: 'xs', color: 'detail' })}>Workspace Pro</p>
          </div>
        )}
      </div>

      {/* navegation */}

      <nav className="flex flex-col gap-1 px-2 pt-4">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors cursor-pointer ${active ? 'bg-white text-black font-medium' : 'text-[#888] hover:text-white hover:bg-hover'} ${isSidebarCollapsed ? 'justify-center' : ''}`}
          >
            <Icon size={16} className="shrink-0" />
            {!isSidebarCollapsed && <span className={typograph({})}>{label}</span>}
          </button>
        ))}
      </nav>

      {/* projects */}
      {!isSidebarCollapsed && (
        <div className="mt-6 px-4">
          <button
            onClick={() => setProjectsOpen((prevOpen) => !prevOpen)}
            className="flex items-center justify-between w-full text-[#555] tracking-widest mb-2 hover:text-[#888] transition-colors cursor-pointer"
          >
            <span className={typograph({ color: 'detail' })}>Projects</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${projectsOpen ? 'rotate-0' : 'rotate-90'}`}
            />
          </button>
          {projectsOpen && (
            <div className="flex flex-col gap-1">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-lg transition-colors ${project.active ? 'bg-hover text-foreground' : 'text-[#666] hover:text-[#aaa] hover:bg-[#151515]'}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full shrink-0`}
                    style={{ backgroundColor: project.color }}
                  ></span>
                  <span className={typograph({ size: 'detail' })}>{project.name}</span>
                  {project.active && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: project.color }}
                    />
                  )}
                </button>
              ))}
              <button className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[#555] hover:text-[#888] transition-colors cursor-pointer">
                <Plus size={12} />
                <span className={typograph({ size: 'detail' })}>Novo projeto</span>
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto">
        {/* notifications */}
        {!isSidebarCollapsed && (
          <div className="mx-3 mb-3 p-3 rounded-lg bg-[#111] border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={12} className="text-[#888]" />
              <span className={typograph({ size: 'xs', color: 'skeleton' })}>3 notificações</span>
            </div>
            <p className={typograph({ size: 'xs', color: 'detail' })}>Tarefa revisada por RK</p>
          </div>
        )}

        {/* user */}
        <div className="flex items-center gap-3 px-3 py-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-[#0a84ff] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">HS</span>
          </div>
          {!isSidebarCollapsed && (
            <>
              <div>
                <p className={typograph({ size: 'detail' })}>Henrique Santos</p>
                <p className={typograph({ size: 'xs', color: 'detail' })}>Developer</p>
              </div>
              <button className="text-[#444] hover:text-[#888] transition-colors ml-auto cursor-pointer">
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
