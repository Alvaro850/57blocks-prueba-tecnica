import { TokenInfoDto } from "./token-info.dto"

export class PokemonDto {
    name: string
    pokedexNumber: PokedexNumber
    types: Array<string>
    generation: number
    public: boolean
    tokenInfo: TokenInfoDto
}
export class PokedexNumber {
    national: number
    johto: number
    hoenn: number
    sinnoh: number
    kalos: number
    alola: number
}