import express from "express"
import { UserDto } from "./dtos/user.dto"
export const router = express.Router()
import { UserController } from './users.controller'
router.post("/createUser", UserController.createUser)