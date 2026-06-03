import Board from './components/kanban/Board'
import ProjectsBoard from './components/kanban/ProjectsBoard'
import { Sidebar } from './components/kanban/Sidebar'
import { useBoardStore } from './stores/useBoardStore'

export default function App() {
  const { selectedProject } = useBoardStore()
  return (
    <section className=" w-screen h-screen flex overflow-hidden">
      <Sidebar />

      {!selectedProject && <ProjectsBoard />}
      {selectedProject && <Board />}
    </section>
  )
}
