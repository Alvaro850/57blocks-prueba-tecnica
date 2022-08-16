import { TokenInfoDto } from "./token-info.dto"

export class PokemonFiltersDto {
    name?: string
    public?: string
    nationalPokedexNumber?: number
    createdByUser?: string
    page?: number
    limit?: number
    tokenInfo: TokenInfoDto
}