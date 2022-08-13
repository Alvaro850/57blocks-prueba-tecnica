import {
    body, ValidationChain, validationResult
} from "express-validator";
import { Request, Response } from "express";
import { Middleware } from "express-validator/src/base";
import { HttpCodes } from "../../../utils/enums/http-codes.enum";
import ResponseOperation from "../../../utils/response";
import { responseMessages } from "../../../utils/constants/response.constant";
import { AppCodes } from "../../../utils/enums/app-codes.enum";
export const validate = (method): Array<ValidationChain | Middleware> => {
    switch (method) {
        case "createUser": {
            return [
                body("email", responseMessages[process.env.LANGUAGE].ERROR_VALIDATION_EMAIL)
                    .exists()
                    .isEmail()
                    .withMessage("El formato del email no es válido"),
                body("password", responseMessages[process.env.LANGUAGE].ERROR_VALIDATION_PASSWORD)
                    .exists()
                    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/, "i")
            ]
        }
    }
}

export const validationErrorHandler = (req: Request, res: Response): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(HttpCodes.BAD_REQUEST).send(new ResponseOperation(false, responseMessages[req.query.language.toString()].ERROR_VALIDATION, AppCodes.COD_RESPONSE_ERROR_VALIDATE))
        return
    }
};