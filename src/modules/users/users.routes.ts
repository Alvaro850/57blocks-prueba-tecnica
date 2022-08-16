import express from "express"
export const router = express.Router()
import { UserController } from './users.controller'
import { validate } from "./validators/users.validator"

router.post("/createUser", validate('createUser'), UserController.createUser)