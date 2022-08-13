import UserRepository from "./database/repositories/user.repository";
import { UserDto } from "./dtos/user.dto";

export class UserService {
    constructor( public userRepository: UserRepository ) {}

    createUser = (user: UserDto) => {
        
    }
}