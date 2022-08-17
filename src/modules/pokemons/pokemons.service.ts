import { Types } from "mongoose";
import { AppCodes } from "../../utils/enums/app-codes.enum";
import IPokemon from "./database/interfaces/pokemon.interface";
import PokemonRepository from "./database/repositories/pokemon.repository";
import { DeletePokemonDto } from "./dtos/delete-pokemon.dto";
import { PokemonFiltersDto } from "./dtos/pokemon-fiters.dto";
import { PokemonSearchStringDto } from "./dtos/pokemon-search.dto";
import { PokemonDto } from "./dtos/pokemon.dto";
import { UpdatePokemonDto } from "./dtos/update-pokemon.dto";

export class PokemonService {
    public readonly pokemonRepository = new PokemonRepository()

    createPokemon = async (pokemon: PokemonDto, language: string): Promise<IPokemon> => {
        const existsByName = await this.pokemonRepository.findOne({ name: { $regex: pokemon.name, $options: "i" } })
        let pokedexOptions = []
        let query = {}
        if (pokemon.pokedexNumber.national) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.national": pokemon.pokedexNumber.national }]
        }
        if (pokemon.pokedexNumber.johto) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.johto": pokemon.pokedexNumber.johto }]
        }
        if (pokemon.pokedexNumber.hoenn) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.hoenn": pokemon.pokedexNumber.hoenn }]
        }
        if (pokemon.pokedexNumber.sinnoh) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.sinnoh": pokemon.pokedexNumber.sinnoh }]
        }
        if (pokemon.pokedexNumber.kalos) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.kalos": pokemon.pokedexNumber.kalos }]
        }
        if (pokemon.pokedexNumber.alola) {
            pokedexOptions = [...pokedexOptions, { "pokedexNumber.alola": pokemon.pokedexNumber.alola }]
        }
        if (pokedexOptions.length > 0) {
            query = { $or: pokedexOptions }
        }
        const existsByPokedexNumber = await this.pokemonRepository.findOne(query)
        if (existsByName) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_POKEMON_SAME_NAME}`)
        }
        if (existsByPokedexNumber) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_POKEMON_SAME_POKEDEX_NUMBER}`)
        }
        const newPokemon = {
            name: pokemon.name,
            pokedexNumber: pokemon.pokedexNumber,
            types: pokemon.types,
            generation: pokemon.generation,
            createdBy: pokemon.tokenInfo.email,
            public: pokemon.public
        }
        const createdPokemon = await this.pokemonRepository.create(newPokemon)
        return createdPokemon
    }
    findAllPokemons = async (filters: PokemonFiltersDto, language: string): Promise<IPokemon[]> => {
        let conditions = {}
        let pagination
        let projection = {}
        let sortOptions = {}
        if (filters.public === "true") {
            conditions = { ...conditions, public: true }
        } else if (filters.public === undefined) {
            conditions = { ...conditions, $or: [{ public: true }, { public: false, createdBy: filters.tokenInfo.email }] }
        } else if (filters.public === "false") {
            conditions = { ...conditions, public: false, createdBy: filters.tokenInfo.email }
        }
        if (filters.name) {
            conditions = { ...conditions, name: { $regex: filters.name, $options: "i" } }
        }
        if (filters.nationalPokedexNumber) {
            conditions = { ...conditions, "pokedexNumber.national": filters.nationalPokedexNumber }
        }
        if (filters.createdByUser === "true") {
            conditions = { ...conditions, createdBy: filters.tokenInfo.email }
        }
        if (filters.page) {
            pagination = { ...pagination, page: filters.page }
        }
        if (filters.limit) {
            pagination = { ...pagination, limit: filters.limit }
        }
        const pokemons = await this.pokemonRepository.find(conditions, projection, pagination, sortOptions)
        return pokemons
    }
    findOnePokemon = async (searchString: PokemonSearchStringDto, language: string): Promise<IPokemon> => {
        const pokemon = await this.pokemonRepository.findOne({ name: searchString.data, $or: [{ public: true }, { createdBy: searchString.tokenInfo.email }] })
        return pokemon
    }
    updateOnePokemon = async (updateOnePokemon: UpdatePokemonDto, language: string) => {
        const exists = await this.pokemonRepository.findOne({ _id: new Types.ObjectId(updateOnePokemon.id), createdBy: updateOnePokemon.tokenInfo.email, public: false })
        const numberIsUsed = await this.pokemonRepository.findOne({ "pokedexNumber.national": updateOnePokemon.nationalPokedexNumber })
        if (exists) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_UNAUTHORIZED}`)
        }
        if (numberIsUsed) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_POKEMON_SAME_POKEDEX_NUMBER}`)
        }
        let set = {}
        if (updateOnePokemon.generation) {
            set = { ...set, generation: updateOnePokemon.generation }
        }
        if (updateOnePokemon != undefined || updateOnePokemon != null) {
            set = { ...set, public: updateOnePokemon.public }
        }
        if (updateOnePokemon.name) {
            set = { ...set, name: updateOnePokemon.name }
        }
        if (updateOnePokemon.nationalPokedexNumber) {
            set = { ...set, "pokedexNumber.national": updateOnePokemon.nationalPokedexNumber }
        }
        const updatedPokemon = await this.pokemonRepository.updateOne({ _id: new Types.ObjectId(updateOnePokemon.id), createdBy: updateOnePokemon.tokenInfo.email }, { $set: set })
        return updatedPokemon
    }
    deleteOnePokemon = async (deleteOnePokemon: DeletePokemonDto, language: string) => {
        const exists = await this.pokemonRepository.findOne({ _id: new Types.ObjectId(deleteOnePokemon.id), createdBy: deleteOnePokemon.tokenInfo.email, public: false })
        if (exists) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_UNAUTHORIZED}`)
        }
        const updatedPokemon = await this.pokemonRepository.deleteOne({ _id: new Types.ObjectId(deleteOnePokemon.id), createdBy: deleteOnePokemon.tokenInfo.email })
        return updatedPokemon
    }
    uploadDefaultPokemons = async () => {
        const pokemons = require('../../utils/defaults/pokemons.default.json')
        for (let pokemon of pokemons) {
            try {
                await this.pokemonRepository.create(pokemon)
            } catch (error) {
                console.log("Pokemon ya exisitía")
            }
        }
    }
}