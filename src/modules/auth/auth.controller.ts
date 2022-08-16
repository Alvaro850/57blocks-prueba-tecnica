import { Request, Response } from "express";
import { context } from "../../utils/constants/module.constant";
import { appMessages } from "../../utils/constants/response.constant";
import { AppCodes } from "../../utils/enums/app-codes.enum";
import { HttpCodes } from "../../utils/enums/http-codes.enum";
import { Logger } from "../../utils/logger";
import ResponseOperation from "../../utils/response";
import { AuthService } from "./auth.service";
import { validationErrorHandler } from "./validators/auth.validator";

export class AuthController {
    private static logger = new Logger()
    private static authService = new AuthService()

    public static login = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].AUTHENTICATION, appMessages[process.env.LANGUAGE].AUTH_INIT_LOGIN)
            const response = await this.authService.login(req.body, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[process.env.LANGUAGE].AUTH_LOGIN_RESPONSE, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].USERS, appMessages[process.env.LANGUAGE].AUTH_LOGIN_ERROR_RESPONSE)
            console.log(error)
            if (error.message === '1022') {
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_INCORRECT_PASSWORD, AppCodes.COD_RESPONSE_ERROR_INCORRECT_CREDENTIALS))
                return
            }else if (error.message === '1014'){
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_USER_NOT_EXISTS, AppCodes.COD_RESPONSE_ERROR_INCORRECT_CREDENTIALS))
                return
            }
            res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_LOGIN_ERROR_RESPONSE, AppCodes.COD_RESPONSE_ERROR_CREATE))
            return
        }
    }
}
