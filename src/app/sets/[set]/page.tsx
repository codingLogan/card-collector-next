'use client'

import { useEffect, useState } from 'react'

import { SORT_OPTION } from '@/app/sorter/constants'
import { sortCards } from '@/app/sorter/sorter'
import { Card } from '@/app/types'
import { getCardData } from '@/app/fetcher'
import CardComponent from '@/app/card/CardComponent'
import { useUserCards } from '@/app/hooks'
import { hasCard } from '@/app/card/utils'

export default function Page({params}: {params: {set: string}}) {
    const [isLoading, setIsLoading] = useState(true)
    const [cardData, setCardData] = useState<Card[]>([])
    const [sortArgs, setSortArgs] = useState<any[]>([SORT_OPTION.DEFAULT])
    const userCards = useUserCards()

    useEffect(() => {
        getCardData(params.set).then(cards => {
            if (sortArgs.length > 0) {
                sortCards(cards, sortArgs)
            }

            setCardData(cards)
            
            setIsLoading(false)
        })
    }, [userCards])

    if (isLoading) {
        return <main className="flex min-h-screen flex-col items-center p-16">Loading...</main>
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center p-16">
            <h1 className="font-bold text-3xl mb-8">{params.set}</h1>
            <h2 className="font-bold text-2xl mb-8">Cards in Set</h2>

            <section
                style={{
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {cardData.map(card => <CardComponent
                    key={card.id}
                    card={card}
                    owned={hasCard(card.id, userCards)}
                />)}
            </section>
        </main>
    )
}