import { Document, Types } from "mongoose";

export default interface IPokemon extends Document {
    name: string,
    pokedexNumber: IPokedexNumber
    types: Array<string>
    generation: number
    createdBy: string
    public: boolean
    createdAt?: Date
    updatedAt?: Date
}
export interface IPokedexNumber {
    national: number
    johto: number
    hoenn: number
    sinnoh: number
    kalos: number
    alola: number
}