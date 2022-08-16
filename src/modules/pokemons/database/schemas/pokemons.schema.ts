import { Schema, Types } from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";
import IPokemon, { IPokedexNumber } from '../interfaces/pokemon.interface';
import { initDb } from '../database';

const PokedexNumberSchema = new Schema<IPokedexNumber>(
    {
        national: { type: Number, default: null },
        johto: { type: Number, default: null },
        hoenn: { type: Number, default: null },
        sinnoh: { type: Number, default: null },
        kalos: { type: Number, default: null },
        alola: { type: Number, default: null }
    }
)

const PokemonSchema = new Schema<IPokemon>(
    {
        name: { type: String, required: true, unique: true, index: true },
        pokedexNumber: { type: PokedexNumberSchema, required: true },
        types: { type: [String], required: true },
        generation: { type: Number, required: true },
        createdBy: { type: String, index: true, default: null },
        public: { type: Boolean, required: true }
    },
    { timestamps: true }
)

PokemonSchema.index({ name: 1, createdBy: 1 })
PokemonSchema.plugin(mongoosePaginate)

export const pokemonConnection = initDb.model(
    'pokemon', PokemonSchema, 'pokemon'
)