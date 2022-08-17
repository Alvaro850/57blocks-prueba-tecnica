import express from "express"
export const router = express.Router()
import { UserController } from './users.controller'
import { validate } from "./validators/users.validator"

/** 
 * @api {post} api/users/createUser User Creation Service
 * @apiVersion 1.0.0
 * @apiGroup Users
 * @apiName User Creation Service
 * @apiDescription Service that creates a user, with the next requirements:
 * 
 * - Validate password contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ].
 * - Validate email is a valid email address.
 * - Validate email is not already registered in the database.
 * 
 * @apiSampleRequest  http://localhost:3000/api/users/createUser
 * 
 * @apiQuery {string} language Language of the server responses: spanish | english.
 * 
 * @apiBody {String} email Is the email to register on the platform.
 * @apiBody {String} password Is the password of the account to register.
 * 
 * @apiParamExample {json} Request Example:
 *  {
 *       "email": "email@email.com",
 *       "password": "TestPassword!"
 *   }
 * 
 * @apiSuccess (200) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (200) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (200) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (200) {String} content.message Response short message about the request response.
 * @apiSuccess (200) {Object} content.data Response data could be any type of variable.
 * @apiSuccess (200) {String} content.data.email Is the email registered on the platform.
 * @apiSuccess (200) {String} content.data.password Is the password already encrypted on the platform.
 * @apiSuccess (200) {Boolean} content.data.confirmed It is refered if a user email is confirmed or not, not implemented yet.
 * @apiSuccess (200) {Boolean} content.data.enabled It is a value to know if a user is enabled on the platform, not yet implemented.
 * @apiSuccess (200) {String} content.data._id ObjectId of the document in mongoDB.
 * @apiSuccess (200) {Date} content.data.createdAt The date of creation of the document.
 * @apiSuccess (200) {Date} content.data.updatedAt The date of the last update of the document.
 * @apiSuccess (200) {Number} content.data.__v Version of the document on mongoDB.
 * 
 * @apiSuccessExample (200) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "email": "email@email.com",
 *          "password": "$2b$10$Vh.a6zmXL6jzgtdcLFooheZFk42Mcif4I3Q/MVKiwfq6xwbiSxBPS",
 *          "confirmed": false,
 *          "enabled": true,
 *          "_id": "62fc5c5e9163820c8a8e7ab7",
 *          "createdAt": "2022-08-17T03:11:26.374Z",
 *          "updatedAt": "2022-08-17T03:11:26.374Z",
 *          "__v": 0
 *      }
 *  }
 * 
*/ 
router.post("/createUser", validate('createUser'), UserController.createUser)