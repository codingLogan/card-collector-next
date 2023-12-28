function saveData(key:string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
}

function readData(key:string) {
    const rawData = localStorage.getItem(key)

    if ( !rawData ) {
        return null
    }

    return JSON.parse(rawData)
}

export function getUsersCards() {
    const cards = readData('cards')

    if ( !cards) {
        saveData('cards', {})
        return {}
    }

    return cards
}

export function collectCard(cardId: string) {
    const cards = getUsersCards()

    // If the user does not have the card at all, create the entry for it
    if (!cards[cardId]) {
        cards[cardId] = []
    }

    // Create a card instance
    cards[cardId].push({id: cardId, quality: null, location: null})
    saveData('cards', cards)
}

export function removeCard(cardId: string) {
    const cards = getUsersCards()

    // For now, remove all instances of a card by unchecking the box
    delete cards[cardId]
    saveData('cards', cards)
}