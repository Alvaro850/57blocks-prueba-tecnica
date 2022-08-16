import { userConnection } from "../schemas/users.schema";
import IUser from "../interfaces/users.interface";
import { Pagination } from "../../../../utils/models/pagination.model";

export default class UserRepository {
    find = async (query: object, projection: object = {}, pagination: Pagination = { page: 1, limit: 0 }, sortOptions: object = {}): Promise<IUser[]> => {
        return userConnection.find(query, projection).sort(sortOptions).skip(((pagination.page - 1) * pagination.limit)).limit(pagination.limit)
    }
    findOne = async (query: object, projection: object = {}): Promise<IUser> => {
        return userConnection.findOne(query, projection)
    }
    create = async (user: object) => {
        const newUser: IUser = new userConnection(user)
        return newUser.save()
    }
    updateOne = async (filter: object, update: object): Promise<IUser> => {
        return userConnection.updateOne(filter, update, { new: true })
    }
    deleteOne = async (filter: object): Promise<IUser> => {
        return userConnection.updateOne(filter, { new: true })
    }
}