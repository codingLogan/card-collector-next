'use client'

import { useEffect, useState } from 'react'

const SORT_OPTION = {
    DEFAULT: "number",
    TYPE: "supertype",
    POKEDEX: "nationalPokedexNumbers",
    ENERGY_TYPE: "types" 
}

const SUPERTYPE = {
    POKEMON: "Pokémon",
    TRAINER: "Trainer",
    ENERGY: "Energy"
}

interface Card {
    id: string,
    number: number,
    name: string,
    images: {
        small: string,
    },
    nationalPokedexNumbers: number[],
    supertype: string
    types: string[]
}

function resolveModule(module: {default: Card[]}): Array<Card> {
    return module.default.map(card => ({
        name: card.name,
        id: card.id,
        number: card.number,
        images: card.images,
        nationalPokedexNumbers: card.nationalPokedexNumbers,
        supertype: card.supertype,
        types: card.types
    }))
}

export default function Page({params}: {params: {set: string}}) {
    const [isLoading, setIsLoading] = useState(true)
    const [cardData, setCardData] = useState<Card[]>([])
    const [sortArgs, setSortArgs] = useState<any[]>([SORT_OPTION.POKEDEX])

    useEffect(() => {
        import(`../../../data/cards/${params.set}.json`).then(module => {
            const cards = resolveModule(module)

            sortCards(cards, sortArgs)
            setCardData(cards)
            
            setIsLoading(false)
        })
    }, [])

    function sortCards(cards: Card[], sortArgs: any) {
        let i = 0
        for (i = 0; i < sortArgs.length; i++) {
            const sortOption = sortArgs[i]

            cards.sort((a: any, b: any) => {
                let aValue = a[sortOption]
                let bValue = b[sortOption]
                
                // Handle any complex sort objects
                if (sortOption === SORT_OPTION.POKEDEX) {
                    if (a.supertype !== SUPERTYPE.POKEMON || b.supertype !== SUPERTYPE.POKEMON) return 0
                    // TODO does Johto dex or any other pokedex come into play?
                    // Assume national dex is the first entry
                    aValue = a[sortOption][0]
                    bValue = b[sortOption][0]
                }

                // Keep this separate from the above POKEDEX check, the energy type structure may change for different reasons
                if (sortOption === SORT_OPTION.ENERGY_TYPE) {
                    if (a.supertype !== SUPERTYPE.POKEMON || b.supertype !== SUPERTYPE.POKEMON) return 0
                    // TODO does Johto dex or any other pokedex come into play?
                    // Assume national dex is the first entry
                    aValue = a[sortOption][0]
                    bValue = b[sortOption][0]
                }

                if (sortOption === SORT_OPTION.DEFAULT) {
                    aValue = Number(a[sortOption])
                    aValue = Number(b[sortOption])
                }

                if (aValue === bValue) {
                    return 0
                } else if (aValue < bValue) {
                    return -1
                } else {
                    return 1
                }
            })
        }
    }

    function cardDisplayName(card: Card) {
        return `${card.name} (${card.id.split('-')[1]})`
    }

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