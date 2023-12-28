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

// ----------------------------------------------------------------------------
// Card saving
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

// ----------------------------------------------------------------------------
// Plan saving

export function getPlans(): any[] {
    const plans = readData('plans')

    if ( !plans) {
        saveData('plans', [])
        return []
    }

    return plans
}

export function createPlan(name: string, options: {
    sort?: string[],
    sets?: string[]
}) {
    const plans = getPlans()

    // If the plan already exists... Don't let the user overwrite
    if (plans.find(plan => plan.name === name) !== undefined) {
        return null
    }

    plans.push({
        id: name.trim().toLowerCase().replace(/[^a-z]/g, ''),
        name,
        options
    })

    saveData('plans', plans)
}

export function getPlan(id: string): {id: string, name: string, options: {sets: string[], sort: string[]}} {
    const plans = getPlans()

    return plans.find(plan => plan.id === id)
}