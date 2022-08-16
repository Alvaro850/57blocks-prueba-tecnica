import express from "express"
export const router = express.Router()
import { AuthController } from './auth.controller'
import { validate } from "./validators/auth.validator"

router.post("/login", validate('login'), AuthController.login)