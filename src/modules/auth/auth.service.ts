import { AuthDto } from "./dtos/auth.dto";
import UserRepository from "../users/database/repositories/user.repository";
import { compare } from 'bcrypt'
import { AppCodes } from "../../utils/enums/app-codes.enum";
import jwt from 'jsonwebtoken'
export class AuthService {
    public readonly userRepository = new UserRepository()
    login = async (auth: AuthDto, language: string) => {
        const user = await this.userRepository.findOne({ email: auth.email })
        if (!user) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_USER_DOES_NOT_EXIST}`)
        }
        const isPasswordCorrect = await compare(auth.password, user.password)
        if (!isPasswordCorrect) {
            throw new Error(`${AppCodes.COD_RESPONSE_ERROR_INCORRECT_CREDENTIALS}`)
        }
        const token = await jwt.sign({ email: user.email, iat: Math.floor(Date.now() / 1000) - 30 }, process.env.JWT_PRIVATE_KEY, { expiresIn: 60 * 20 })
        return { token }
    }
}