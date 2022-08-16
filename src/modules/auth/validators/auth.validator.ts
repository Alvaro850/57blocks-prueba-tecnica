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
export const validate = (method): Array<ValidationChain | Middleware> => {
    switch (method) {
        case "login": {
            return [
                body("email")
                    .exists().withMessage(appMessages[process.env.LANGUAGE].ERROR_EMAIL_EXISTS)
                    .isEmail().withMessage(appMessages[process.env.LANGUAGE].ERROR_EMAIL_INVALID),
                body("password")
                    .exists().withMessage(appMessages[process.env.LANGUAGE].ERROR_PASSWORD_EXISTS)
                    .matches(new RegExp("(?=.*[a-z])(?=.*[A-Z])")).withMessage(appMessages[process.env.LANGUAGE].ERROR_PASSWORD_LOW_UPPER_CASE)
                    .isLength({ min: 10 }).withMessage(appMessages[process.env.LANGUAGE].ERROR_PASSWORD_LENGTH)
                    .matches(new RegExp("(?=.*[!@#?\\]])")).withMessage(appMessages[process.env.LANGUAGE].ERROR_PASSWORD_SPECIAL_CHAR + " ! @ # ? ] "),
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
        logger.error(context[process.env.LANGUAGE].VALIDATION,appMessages[process.env.LANGUAGE].ERROR_VALIDATION)
        console.log(errors)
        const data = errors.map(error => { return error.msg })
        res.status(HttpCodes.BAD_REQUEST).send(new ResponseOperation(false, appMessages[req.query.language.toString()].ERROR_VALIDATION, AppCodes.COD_RESPONSE_ERROR_VALIDATE, data))
        return false
    }
    return true
};