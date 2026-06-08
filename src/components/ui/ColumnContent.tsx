import useCards from '../../hooks/queries/useCards'
import Card from './Card'

export default function ColumnContent({ columnId }: { columnId: string }) {
  const { data: cards = [], isLoading } = useCards(columnId)
  console.log(cards)
  return (
    <div>
      {cards.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  )
}
