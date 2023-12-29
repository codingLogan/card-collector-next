'use client'

import { useEffect, useState } from 'react'

import { SORT_OPTION } from '@/app/sorter/constants'
import { sortCards } from '@/app/sorter/sorter'
import { Card } from '@/app/types'
import { getCardData } from '@/app/fetcher'
import CardComponent from '@/app/card/CardComponent'
import { getPlan } from '@/app/saver'
import { useUserCards } from '@/app/hooks'
import { hasCard } from '@/app/card/utils'


export default function Page({params}: {params: { plan: string}}) {
    const [plan, setPlan] = useState<any>()
    const [isLoading, setIsLoading] = useState(true)
    const [cardData, setCardData] = useState<Card[]>([])
    const userCards = useUserCards()

    useEffect(() => {
        const plan = getPlan(params.plan)
        setPlan(plan)

        const promises: any[] = []
        plan.options.sets.forEach(setId => promises.push(getCardData(setId)))

        Promise.all(promises).then(cards => {
            const allCards = cards.flat()
            // TODO Type is hardcoded here!!!
            sortCards(allCards, [SORT_OPTION.TYPE, ...plan.options.sort])
            setCardData(allCards)
            
            setIsLoading(false)
        })
    }, [userCards])

    if (isLoading) {
        return <main className="flex min-h-screen flex-col items-center p-16">Loading...</main>
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center py-16 px-2">
            <h1 className="font-bold text-3xl mb-8">Custom Collection</h1>
            <h2 className="font-bold text-2xl mb-8">{plan.name}</h2>

            <section
                style={{
                    display: "grid",
                    gridTemplateColumns: 'repeat(3, 1fr)',
                }}
            >
                {cardData.map(card =><CardComponent
                    key={card.id}
                    card={card}
                    owned={hasCard(card.id, userCards)}
                    options={{useName: false}}
                />)}
            </section>
        </main>
    )
}