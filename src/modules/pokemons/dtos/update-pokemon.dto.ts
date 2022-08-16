import { TokenInfoDto } from "./token-info.dto"

export class UpdatePokemonDto {
    id: string
    name?: string
    public?: boolean
    nationalPokedexNumber?: number
    generation?: string
    tokenInfo: TokenInfoDto
}