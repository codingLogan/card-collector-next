import { Card } from "./types"

export async function getCardData(setId: string) {
    const response = await fetch(`/api/cards?setId=${setId}`)
    const cardData = await response.json()
    return resolveCardsFromRawData(cardData)
}

function resolveCardsFromRawData(module: {data: Card[]}): Array<Card> {
    return module.data.map(card => ({
        name: card.name,
        id: card.id,
        number: card.number,
        images: card.images,
        nationalPokedexNumbers: card.nationalPokedexNumbers,
        supertype: card.supertype,
        types: card.types
    }))
}