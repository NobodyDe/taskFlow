import Board from './components/kanban/Board'
import { Sidebar } from './components/kanban/Sidebar'

export default function App() {
  return (
    <section className=" w-screen h-screen flex overflow-hidden">
      <Sidebar />
      <Board />
    </section>
  )
}
