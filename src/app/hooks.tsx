import { useEffect, useState } from "react"
import { getUsersCards } from "./saver"

export function useUserCards() {
    const [userCards, setUserCards] = useState<any>()

    useEffect(() => {
        const userCards = getUsersCards()
        setUserCards(userCards)
    }, [])

    return userCards
}