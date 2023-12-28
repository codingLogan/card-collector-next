'use client'

import { useEffect, useState } from "react"
import CardComponent from "../card/CardComponent"
import { getUsersCards } from "../saver"
import { getCardData } from "../fetcher"
import { sortCards } from "../sorter/sorter"
import { Card } from "../types"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  const [userCards, setCards] = useState([])
  const [inProgressSets, setInProgressSets] = useState<any>([])
  const [cardData, setCardData] = useState<Card[]>([])

  function getInProgressSets(cards) {
    const setOfSets = new Set()
    for (let card in cards) {
      // Get setId (split into another area)
      const setId = card.split('-')[0]
      setOfSets.add(setId)
    }

    return Array.from(setOfSets)
  }

  useEffect(() => {
    const userCards = getUsersCards()
    setCards(userCards)

    const inProgressSets = getInProgressSets(userCards)
    setInProgressSets(inProgressSets)

    const promises: any[] = []
    inProgressSets.forEach(setId => promises.push(getCardData(setId)))

    Promise.all(promises).then(cards => {
        const allCards = cards.flat()
        const filteredCards = allCards.filter(setCard => {
          return !!userCards[setCard.id]
        })
        // sortCards(allCards, [SORT_OPTION.TYPE, ...plan.options.sort])
        setCardData(filteredCards)
        
        setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <main className="flex min-h-screen flex-col items-center p-16">Loading...</main>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-16">
      <h1 className="font-bold text-3xl">Collection</h1>

      <h2>Mixed sets</h2>

      <section
                style={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                }}
            >
                {cardData.map(card =><CardComponent
                  key={card.id}
                  card={card}
                  options={{useName: false}}
                  owned={true}
                  />
                )}
            </section>
    </main>
  )
}
