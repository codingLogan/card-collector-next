import { SORT_OPTION, SUPERTYPE } from "./constants"

export function sortCards(cards: any[], sortArgs: any) {
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