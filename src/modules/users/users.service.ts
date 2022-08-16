import IUser from "./database/interfaces/users.interface";
import UserRepository from "./database/repositories/user.repository";
import { UserDto } from "./dtos/user.dto";
import { hash, genSalt } from 'bcrypt'
// import { sendEmail } from '../../utils/mailer'
// import { appMessages } from "../../utils/constants/response.constant";
export class UserService {
    public readonly userRepository = new UserRepository()
    createUser = async (user: UserDto, language: string): Promise<IUser> => {
        const salt = await genSalt();
        const passwordEncrypted = await hash(user.password, salt);
        const newUser = {
            email: user.email,
            password: passwordEncrypted
        };
        const userCreated = this.userRepository.create(newUser)
        // const code = Math.floor(1000 + Math.random() * 9000).toString();
        // await sendEmail(user.email, appMessages[language].MAIL_CONFIRM_USER, "<p>Por favor </p>")
        return userCreated
    }
}