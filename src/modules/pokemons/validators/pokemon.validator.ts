import {
    body, query, ValidationChain, validationResult
} from "express-validator";
import { Request, Response } from "express";
import { Middleware } from "express-validator/src/base";
import { HttpCodes } from "../../../utils/enums/http-codes.enum";
import ResponseOperation from "../../../utils/response";
import { appMessages } from "../../../utils/constants/response.constant";
import { AppCodes } from "../../../utils/enums/app-codes.enum";
import { Logger } from "../../../utils/logger";
import { context } from "../../../utils/constants/module.constant";
import { nextTick } from "process";
export const validate = (method): Array<ValidationChain | Middleware> => {
    switch (method) {
        case "createPokemon": {
            return [
                body("name")
                    .isString().withMessage(`name ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                body("pokedexNumber")
                    .isObject().withMessage(`pokedexNumber ${appMessages[process.env.LANGUAGE].VAR_OBJECT}`),
                body("pokedexNumber.national")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.national ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("pokedexNumber.johto")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.johto ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("pokedexNumber.hoenn")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.hoenn ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("pokedexNumber.sinnoh")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.sinnoh ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("pokedexNumber.kalos")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.kalos ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("pokedexNumber.alola")
                    .optional({ nullable: true })
                    .isNumeric().withMessage(`pokedexNumber.alola ${appMessages[process.env.LANGUAGE].VAR_NUMBER_OR_NULL}`),
                body("types")
                    .isArray().withMessage(`types ${appMessages[process.env.LANGUAGE].VAR_ARRAY}`),
                body("generation")
                    .isNumeric().withMessage(`generation ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                body("public")
                    .isBoolean().withMessage(`public ${appMessages[process.env.LANGUAGE].VAR_BOOLEAN}`),
                query("language")
                    .exists()
            ]
        }
        case "findAllPokemons": {
            return [
                query("name")
                    .optional()
                    .isString().withMessage(`name ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                query("public")
                    .optional()
                    .isBoolean().withMessage(`public ${appMessages[process.env.LANGUAGE].VAR_BOOLEAN}`),
                query("nationalPokedexNumber")
                    .optional()
                    .isNumeric().withMessage(`nationalPokedexNumber ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                query("createdByUser")
                    .optional()
                    .isBoolean().withMessage(`createdByUser ${appMessages[process.env.LANGUAGE].VAR_BOOLEAN}`),
                query("page")
                    .optional()
                    .isNumeric().withMessage(`page ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                query("limit")
                    .optional()
                    .isNumeric().withMessage(`limit ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                query("language")
                    .exists()
            ]
        }
        case "findOnePokemon": {
            return [
                query("data")
                    .exists().withMessage(`data ${appMessages[process.env.LANGUAGE].VAR_EXISTS}`)
                    .isString().withMessage(`data ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                query("language")
                    .exists()
            ]
        }
        case "updateOnePokemon": {
            return [
                body("id")
                    .exists().withMessage(`id ${appMessages[process.env.LANGUAGE].VAR_EXISTS}`)
                    .isString().withMessage(`id ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                body("name")
                    .optional()
                    .isString().withMessage(`name ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                body("public")
                    .optional()
                    .isBoolean().withMessage(`public ${appMessages[process.env.LANGUAGE].VAR_BOOLEAN}`),
                body("nationalPokedexNumber")
                    .optional()
                    .isNumeric().withMessage(`nationalPokedexNumber ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                body("generation")
                    .optional()
                    .isNumeric().withMessage(`generation ${appMessages[process.env.LANGUAGE].VAR_NUMBER}`),
                query("language")
                    .exists()
            ]
        }
        case "deleteOnePokemon": {
            return [
                body("id")
                    .exists().withMessage(`id ${appMessages[process.env.LANGUAGE].VAR_EXISTS}`)
                    .isString().withMessage(`id ${appMessages[process.env.LANGUAGE].VAR_STRING}`),
                query("language")
                    .exists()
            ]
        }
    }
}

export const validationErrorHandler = (req: Request, res: Response): boolean => {
    const logger = new Logger()
    logger.debug(context[process.env.LANGUAGE].VALIDATION, appMessages[process.env.LANGUAGE].INIT_VALIDATION)
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        logger.error(context[process.env.LANGUAGE].VALIDATION, appMessages[process.env.LANGUAGE].ERROR_VALIDATION)
        console.log(errors)
        const data = errors.map(error => { return error.msg })
        res.status(HttpCodes.BAD_REQUEST).send(new ResponseOperation(false, appMessages[req.query.language ? req.query.language.toString() : process.env.LANGUAGE].ERROR_VALIDATION, AppCodes.COD_RESPONSE_ERROR_VALIDATE, data))
        return false
    }
    return true
};