export interface Card {
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