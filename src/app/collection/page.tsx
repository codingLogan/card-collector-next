'use client'

import { useEffect, useState } from "react"
import CardComponent from "../card/CardComponent"
import { getCardData } from "../fetcher"
import { Card } from "../types"
import { hasCard } from "../card/utils"
import { useUserCards } from "../hooks"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [cardData, setCardData] = useState<Card[]>([])
  const userCards = useUserCards()

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

    const inProgressSets = getInProgressSets(userCards)
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
  }, [userCards])

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
                  owned={hasCard(card.id, userCards)}
                  />
                )}
            </section>
    </main>
  )
}
