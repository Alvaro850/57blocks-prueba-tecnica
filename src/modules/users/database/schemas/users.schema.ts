import { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import IUser from "../interfaces/users.interface";
import { initDb } from "../database";

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        confirmed: { type: Boolean, required: true, default: false },
        enabled: { type: Boolean, required: true, default: true }
    },
    { timestamps: true }
)

UserSchema.index({email: 1})
UserSchema.plugin(mongoosePaginate)

export const userConnection = initDb.model(
    'user', UserSchema, 'user'
)