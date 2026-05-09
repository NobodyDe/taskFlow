import { useState } from 'react'

export default function Activity() {
  const [activities, setActivities] = useState([
    {
      id: 'act1',
      type: 'created',
      author: 'RK',
      authorColor: '#ff9500',
      timestamp: '2026-04-14T10:00:00',
      details: 'criou este card',
    },
    {
      id: 'act2',
      type: 'moved',
      author: 'RK',
      authorColor: '#ff9500',
      timestamp: '2026-04-15T11:30:00',
      details: 'moveu de Backlog para To Do',
    },
    {
      id: 'act3',
      type: 'priority_changed',
      author: 'AM',
      authorColor: '#0a84ff',
      timestamp: '2026-04-16T14:20:00',
      details: 'alterou a prioridade para Crítico',
    },
    {
      id: 'act4',
      type: 'moved',
      author: 'RK',
      authorColor: '#ff9500',
      timestamp: '2026-04-18T09:45:00',
      details: 'moveu de To Do para In Progress',
    },
  ])

  return <div>ola</div>
}
