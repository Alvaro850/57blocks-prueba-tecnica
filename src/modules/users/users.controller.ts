import { Request, Response } from "express";
import { context } from "../../utils/constants/module.constant";
import { responseMessages } from "../../utils/constants/response.constant";
import { AppCodes } from "../../utils/enums/app-codes.enum";
import { HttpCodes } from "../../utils/enums/http-codes.enum";
import { Logger } from "../../utils/logger";
import ResponseOperation from "../../utils/response";
import { UserService } from "./users.service";

export class UserController {
    private static logger = new Logger()
    private static userService: UserService

    public static createUser = async (req: Request, res: Response) => {
        try {
            this.logger.debug(context[process.env.LANGUAGE].USERS, responseMessages[process.env.LANGUAGE].USER_INIT_CREATE)
            res.send(new ResponseOperation(true, responseMessages[process.env.LANGUAGE].USER_RESPONSE_CREATE, AppCodes.COD_RESPONSE_SUCCESS, { email: req.body.email, password: req.body.password }))
        } catch (error) {
            this.logger.error(context[process.env.LANGUAGE].USERS, responseMessages[process.env.LANGUAGE].USER_ERROR_CREATE)
            console.log(error)
            res.status(HttpCodes.INTERNAL_ERROR).send(new ResponseOperation(false, responseMessages[process.env.LANGUAGE].USER_ERROR_CREATE, AppCodes.COD_RESPONSE_ERROR_CREATE))
        }
    }
}
