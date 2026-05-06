import Column from '../ui/Column'
import Header from '../ui/Header'
import StatusBar from '../ui/StatusBar'

export default function Board() {
  return (
    <section className="bg-background flex-1 flex flex-col h-screen overflow-hidden">
      <Header />
      <StatusBar />
      <div className="flex gap-5 p-6 flex-1 overflow-x-auto overflow-y-auto">
        <Column />
      </div>
    </section>
  )
}
