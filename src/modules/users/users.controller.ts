import { Request, Response } from "express";
import { context } from "../../utils/constants/module.constant";
import { appMessages } from "../../utils/constants/response.constant";
import { AppCodes } from "../../utils/enums/app-codes.enum";
import { HttpCodes } from "../../utils/enums/http-codes.enum";
import { Logger } from "../../utils/logger";
import ResponseOperation from "../../utils/response";
import { UserService } from "./users.service";
import { validationErrorHandler } from "./validators/users.validator";

export class UserController {
    private static logger = new Logger()
    private static userService = new UserService()

    public static createUser = async (req: Request, res: Response) => {
        try {
            if (!validationErrorHandler(req, res)) {
                return
            }
            this.logger.debug(context[process.env.LANGUAGE].USERS, appMessages[process.env.LANGUAGE].USER_INIT_CREATE)
            const response = await this.userService.createUser(req.body, req.query.language.toString())
            return res.send(new ResponseOperation(true, appMessages[process.env.LANGUAGE].USER_RESPONSE_CREATE, AppCodes.COD_RESPONSE_SUCCESS, response))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].USERS, appMessages[process.env.LANGUAGE].USER_ERROR_CREATE)
            console.log(error)
            if (error.code === 11000){
                res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].USER_DUPLICATED_EMAIL, AppCodes.COD_RESPONSE_ERROR_CREATE))
                return
            }
            res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, appMessages[req.query.language.toString()].USER_ERROR_CREATE, AppCodes.COD_RESPONSE_ERROR_CREATE))
            return
        }
    }
}
