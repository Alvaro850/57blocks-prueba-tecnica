import { Document } from 'mongoose'

export default interface IUser extends Document {
    email: string,
    password: string,
    confirmed: boolean,
    enabled: boolean,
    createdAt?: Date,
    updatedAt?: Date
}