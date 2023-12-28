'use client'

import { useEffect, useState } from 'react'

import { SORT_OPTION } from '@/app/sorter/constants'
import { sortCards } from '@/app/sorter/sorter'
import { Card } from '@/app/types'
import { getCardData } from '@/app/fetcher'
import CardComponent from '@/app/card/CardComponent'

export default function Page({params}: {params: {set: string}}) {
    const [isLoading, setIsLoading] = useState(true)
    const [cardData, setCardData] = useState<Card[]>([])
    const [sortArgs, setSortArgs] = useState<any[]>([SORT_OPTION.POKEDEX])

    useEffect(() => {
        getCardData(params.set).then(cards => {
            sortCards(cards, sortArgs)
            setCardData(cards)
            
            setIsLoading(false)
        })
    }, [])

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
                {cardData.map(card =><CardComponent card={card} />)}
            </section>
        </main>
    )
}