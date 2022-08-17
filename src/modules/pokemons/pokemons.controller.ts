import { Request, Response } from "express";
import { context } from "../../utils/constants/module.constant";
import { appMessages } from "../../utils/constants/response.constant";
import { AppCodes } from "../../utils/enums/app-codes.enum";
import { HttpCodes } from "../../utils/enums/http-codes.enum";
import { Logger } from "../../utils/logger";
import ResponseOperation from "../../utils/response";
import { PokemonService } from "./pokemons.service";
import { validationErrorHandler } from "./validators/pokemon.validator";

export class PokemonController {
    private static logger = new Logger()
    private static pokemonService = new PokemonService()
    public static createPokemon = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMONS_INIT_CREATE)
            const response = await this.pokemonService.createPokemon(req.body, req.query.language.toString())
            return res.status(HttpCodes.CREATED).send(new ResponseOperation(true, appMessages[req.query.language.toString()].POKEMONS_CREATE_SUCCESS, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_CREATE_ERROR)
            console.log(error)
            if (error.message === "2001") {
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].POKEMON_NAME_ERROR, AppCodes.COD_RESPONSE_ERROR_CREATE))
                return
            }
            if (error.message == "2002") {
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].POKEMON_POKEDEX_ERROR, AppCodes.COD_RESPONSE_ERROR_CREATE))
                return
            }
            res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].POKEMON_CREATE_ERROR, AppCodes.COD_RESPONSE_ERROR_CREATE))
            return
        }
    }
    public static findAllPokemons = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_FIND_ALL_INIT)
            const data = { ...req.query, tokenInfo: req.body.tokenInfo }
            const response = await this.pokemonService.findAllPokemons(data, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[req.query.language.toString()].POKEMON_FIND_ALL_SUCCESS, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_FIND_ALL_ERROR)
            console.log(error)
            return res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_FIND_ALL_ERROR, AppCodes.COD_RESPONSE_ERROR_FIND))
        }
    }
    public static findOnePokemon = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_FIND_ONE_INIT)
            const data = { data: req.query.data.toString(), tokenInfo: req.body.tokenInfo }
            const response = await this.pokemonService.findOnePokemon(data, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[req.query.language.toString()].POKEMON_FIND_ONE_SUCCESS, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_FIND_ONE_ERROR)
            console.log(error)
            return res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_FIND_ONE_ERROR, AppCodes.COD_RESPONSE_ERROR_FIND))
        }
    }
    public static updateOnePokemon = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_UPDATE_INIT)
            const response = await this.pokemonService.updateOnePokemon(req.body, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[req.query.language.toString()].POKEMON_UPDATE_SUCCESS, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_UPDATE_ERROR)
            console.log(error)
            if (error.message === "1007") {
                return res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_UNAUTHORIZED_ACTION, AppCodes.COD_RESPONSE_ERROR_UNAUTHORIZED))
            }
            if (error.message == "2002") {
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].POKEMON_POKEDEX_ERROR, AppCodes.COD_RESPONSE_ERROR_CREATE))
                return
            }
            return res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_UPDATE_ERROR, AppCodes.COD_RESPONSE_ERROR_UPDATE))
        }
    }
    public static deleteOnePokemon = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_DELETE_INIT)
            const response = await this.pokemonService.deleteOnePokemon(req.body, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[req.query.language.toString()].POKEMON_DELETE_SUCCESS, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].POKEMONS, appMessages[process.env.LANGUAGE].POKEMON_DELETE_ERROR)
            console.log(error)
            if (error.message === "1007") {
                return res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_UNAUTHORIZED_ACTION, AppCodes.COD_RESPONSE_ERROR_UNAUTHORIZED))
            } 
            return res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_DELETE_ERROR, AppCodes.COD_RESPONSE_ERROR_DELETE))
        }
    }
    public static uploadDefaultPokemons = async (req:Request, res: Response) => {
        try {
            console.log("controller")
            await this.pokemonService.uploadDefaultPokemons()
            return res.send(new ResponseOperation(true, "Ok...", AppCodes.COD_RESPONSE_SUCCESS))
        } catch (error) {
            return res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString() ? req.query.language.toString() : process.env.LANGUAGE].POKEMON_DELETE_ERROR, AppCodes.COD_RESPONSE_ERROR_DELETE))
        }
    }
}