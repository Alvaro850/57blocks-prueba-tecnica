'use strict'
import mongoose from 'mongoose';
import { context } from '../../../utils/constants/module.constant';
import { responseMessages } from '../../../utils/constants/response.constant';
import { Logger } from '../../../utils/logger';
const database = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@proyectog-database.ijxop.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const logger = new Logger()
export let initDb
if (process.env.SSL_CERTIFICATE === "true") {
    logger.error(context[process.env.LANGUAGE].DB, responseMessages[process.env.LANGUAGE].RES_BUILDING)
} else {
    initDb = mongoose.createConnection(database)
}