import express from "express"
export const router = express.Router()
import { AuthController } from './auth.controller'
import { validate } from "./validators/auth.validator"

/** 
 * @api {post} api/auth/login Log in Service
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName Login Service
 * @apiDescription Service that log in and sent authorization token to the client, the variables has some requirements:
 * 
 * - Validate password contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ].
 * - Validate email is a valid email address.
 * - Validate email is not already registered in the database.
 * 
 * @apiSampleRequest  http://localhost:3000/api/auth/login
 * 
 * @apiQuery {string} language Language of the server responses: spanish | english.
 * 
 * @apiBody {String} email Is the email registered on the platform.
 * @apiBody {String} password Is the password of the account registered.
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
 * @apiSuccess (200) {String} content.data.token Token that should be used in all the request that involves Pokemons.
 * 
 * @apiSuccessExample (200) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Se inició sesión de manera correcta",
 *          "data": {
 *              "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhcGVyYWZhbkBnbWFpbC5jb20iLCJpYXQiOjE2NjA3MDU0NzMsImV4cCI6MTY2MDcwNjY3M30.YAGqcKCnsbl4patKKcjxXKUpF96X6iSNCXvzqnGNz5Q"
 *          }
 *      }
 *  }
 * 
*/ 
router.post("/login", validate('login'), AuthController.login)