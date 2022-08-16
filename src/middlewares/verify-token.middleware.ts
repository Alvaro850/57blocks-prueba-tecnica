import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'
import { appMessages } from "../utils/constants/response.constant";
import { AppCodes } from "../utils/enums/app-codes.enum";
import { HttpCodes } from "../utils/enums/http-codes.enum";
import ResponseOperation from "../utils/response";
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token) {
        res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_TOKEN_MISSING, AppCodes.COD_RESPONSE_MISSING_TOKEN))
        return
    }
    try {
        const decoded = verify(token, process.env.JWT_PRIVATE_KEY)
        req.body = { ...req.body, tokenInfo: { email: decoded.email } }
        next()
        return
    } catch (error) {
        console.log(error)
        if(error.message === "jwt expired"){
            res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_TOKEN_EXPIRED, AppCodes.COD_RESPONSE_ERROR_TOKEN_EXPIRED))
            return
        }
        else if(error.message == "invalid signature"){
            res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_TOKEN_NOT_VALID, AppCodes.COD_RESPONSE_VALIDATION_TOKEN))
            return
        }
        else {
            res.status(HttpCodes.UNAUTHORIZED).send(new ResponseOperation(false, appMessages[req.query.language.toString()].AUTH_TOKEN_ERROR_VALIDATION, AppCodes.COD_RESPONSE_VALIDATION_TOKEN))
            return
        }
    }


}