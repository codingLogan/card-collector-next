'use client'

import { useEffect, useState } from 'react'

import { SORT_OPTION } from '@/app/sorter/constants'
import { sortCards } from '@/app/sorter/sorter'
import { Card } from '@/app/types'
import { getCardData } from '@/app/fetcher'

// Assumption of a hard codeed plan
// The user wants to combine the first 3 base sets into one sortable collection
// Order assumption - Pokemon, Trainers, then energies
// Pokemon should be in pokedex order

export default function Page({params}: {params: { plan: string}}) {
    const [isLoading, setIsLoading] = useState(true)
    const [cardData, setCardData] = useState<Card[]>([])
    const [sortArgs, setSortArgs] = useState<any[]>([SORT_OPTION.TYPE, SORT_OPTION.POKEDEX])
    const [selectedSets, setSelectedSets] = useState([
        'base1',
        'base2',
        'base3'
    ])

    const [collectionName, setCollectionName] = useState('Base-Jungle-Fossil')

    useEffect(() => {
        const promises: any[] = []
        selectedSets.forEach(setId => promises.push(getCardData(setId)))

        console.log(promises)
        Promise.all(promises).then(cards => {
            const allCards = cards.flat()
            console.log(allCards)
            sortCards(allCards, sortArgs)
            console.log(allCards.map(card => card.nationalPokedexNumbers ? card.nationalPokedexNumbers[0] : "none"))
            setCardData(allCards)
            
            setIsLoading(false)
        })
    }, [])

    function cardDisplayName(card: Card) {
        return `${card.name} (${card.id.split('-')[1]})`
    }

    if (isLoading) {
        return <main className="flex min-h-screen flex-col items-center p-16">Loading...</main>
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center p-16">
            <h1 className="font-bold text-3xl mb-8">Custom Collection</h1>
            <h2 className="font-bold text-2xl mb-8">{collectionName}</h2>

            <section
                style={{
                display: "flex",
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px'
                }}
            >
                {cardData.map(card =>
                <div
                    key={card.id}
                    style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    width: '100%'
                    }}
                >
                    <span
                    className="hover:bg-gray-300"
                    style={{
                        width: "100%",
                        padding: "16px",
                    }}
                    >
                    <h2 style={{textAlign: "center"}}>{cardDisplayName(card)}</h2>
                    <img src={card.images.small}/>
                    </span>
                </div>)}
                <div>
                </div>
            </section>
        </main>
    )
}