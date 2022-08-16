import { pokemonConnection } from "../schemas/pokemons.schema";
import IPokemon from "../interfaces/pokemon.interface";
import { Pagination } from "../../../../utils/models/pagination.model";

export default class PokemonRepository {
    find = async (query: object, projection: object = {}, pagination: Pagination = { page: 1, limit: 0 }, sortOptions: object = {}): Promise<IPokemon[]> => {
        return pokemonConnection.find(query, projection).sort(sortOptions).skip(((pagination.page - 1) * pagination.limit)).limit(pagination.limit)
    }
    findOne = async (query: object, projection: object = {}): Promise<IPokemon> => {
        return pokemonConnection.findOne(query, projection)
    }
    create = async (pokemon: object) => {
        const newPokemon: IPokemon = new pokemonConnection(pokemon)
        return newPokemon.save()
    }
    updateOne = async (filter: object, update: object): Promise<IPokemon> => {
        return pokemonConnection.updateOne(filter, update, { new: true })
    }
    deleteOne = async (filter: object): Promise<IPokemon> => {
        return pokemonConnection.deleteOne(filter, { new: true })
    }
}