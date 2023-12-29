export function hasCard(cardId: string, cards: any) {
    // If cards contains card.id
    return !!cards[cardId]
}