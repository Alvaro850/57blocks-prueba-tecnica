import express from "express"
import { verifyToken } from "../../middlewares/verify-token.middleware"
import { PokemonController } from "./pokemons.controller"
import { validate } from "./validators/pokemon.validator"
export const router = express.Router()

/** 
 * @api {post} api/pokemon/createUser Create Pokemon
 * @apiVersion 1.0.0
 * @apiGroup Pokemon
 * @apiName Create Pokemon
 * @apiDescription Service that creates a pokemon in a mongoDB collection with some limits: 
 * - Two pokemons can't have the same name
 * - Two pokemons can't have the same number in the pokedex
 * 
 * @apiSampleRequest  http://localhost:3000/api/pokemon/createUser
 * 
 * @apiHeader {string} Authorization The token that is bringed on login.
 * 
 * @apiQuery {string} language Language of the server responses: spanish | english.
 * 
 * 
 * @apiBody {String} name Is the name of the Pokemon. It should be unique.
 * @apiBody {Object} pokedexNumber Object with some of the numbers of the pokemon in diferents pokedex.
 * @apiBody {Number} pokedexNumber[national] Number of the pokemon in the national pokedex. It should be unique.
 * @apiBody {Number} pokedexNumber[johto] Number of the pokemon in the johto pokedex. It should be unique.
 * @apiBody {Number} pokedexNumber[hoenn] Number of the pokemon in the hoenn pokedex. It should be unique.
 * @apiBody {Number} pokedexNumber[sinnoh] Number of the pokemon in the sinnoh pokedex. It should be unique.
 * @apiBody {Number} pokedexNumber[kalos] Number of the pokemon in the kalos pokedex. It should be unique.
 * @apiBody {Number} pokedexNumber[alola] Number of the pokemon in the alola pokedex. It should be unique.
 * @apiBody {Array} types Array of strings of the pokemon types.
 * @apiBody {Number} generation Number of the generation which the pokemon belongs.
 * @apiBody {Boolean} public Defines if the pokemon will be public or not.
 * 
 * @apiParamExample {json} Request Example:
 *  {
 *       "name": "Prueba Alvaro 2",
 *       "pokedexNumber": {
 *           "national": 2,
 *           "johto": null,
 *           "hoenn": 2,
 *           "sinnoh": null,
 *           "kalos": null,
 *           "alola": null
 *       },
 *       "types": [
 *           "PLANTA"
 *       ],
 *       "generation": 1,
 *       "public": true
 *   }
 * 
 * @apiSuccess (201) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (201) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (201) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (201) {String} content.message Response short message about the request response.
 * @apiSuccess (201) {Object} content.data Response data could be any type of variable.
 * @apiSuccess (201) {String} content.data.name Name of the pokemon in the database.
 * @apiSuccess (201) {Object} content.data.pokedexNumber Object that contains diferent pokedex numbers in the database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.national Number of the pokemon in the national pokedex on database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.johto Number of the pokemon in the johto pokedex on database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.hoenn Number of the pokemon in the hoenn pokedex on database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.sinnoh Number of the pokemon in the sinnoh pokedex on database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.kalos Number of the pokemon in the kalos pokedex on database.
 * @apiSuccess (201) {Number} content.data.pokedexNumber.alola Number of the pokemon in the alola pokedex on database.
 * @apiSuccess (201) {String[]} content.data.types Types of the pokemon in the database.
 * @apiSuccess (201) {Number} content.data.generation Generation of the pokemon in the database.
 * @apiSuccess (201) {Boolean} content.data.public Determines if the pokemon will be public or not.
 * @apiSuccess (201) {String} content.data._id Is the identificator of mongoDB.
 * @apiSuccess (201) {Date} content.data.createdAt Date of creation of the document in the DB.
 * @apiSuccess (201) {Date} content.data.createdAt Date of update of the document in the DB.
 * @apiSuccess (201) {Date} content.data.__v Version of document on mongoDB.
 * 
 * @apiSuccessExample (201) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Se ha creado pokemon con exito",
 *          "data": {
 *              "name": "Prueba Alvaro 1",
 *              "pokedexNumber": {
 *                  "national": 301,
 *                  "johto": null,
 *                  "hoenn": 301,
 *                  "sinnoh": null,
 *                  "kalos": null,
 *                  "alola": null,
 *                  "_id": "62faa1601f0139a80aea08d8"
 *              }
 *              "types": [
 *                  "PLANTA"
 *              ],
 *              "generation": 2,
 *              "createdBy": "aaperafan@gmail.com",
 *              "public": true,
 *              "_id": "62faa1601f0139a80aea08d7",
 *              "createdAt": "2022-08-15T19:41:20.157Z",
 *              "updatedAt": "2022-08-15T19:41:20.157Z",
 *              "__v": 0
 *          }
 *      }
 *  }
 * 
*/ 
router.post('/createPokemon', verifyToken, validate('createPokemon'), PokemonController.createPokemon)

/** 
 * @api {get} api/pokemon/findAllPokemons Find All Pokemons
 * @apiVersion 1.0.0
 * @apiGroup Pokemon
 * @apiName Find All Pokemons
 * @apiDescription Service that find all Pokemons with some filters. 
 * 
 * @apiHeader {String} Authorization The token that is bringed on login.
 * 
 * @apiSampleRequest  http://localhost:3000/api/pokemon/findAllPokemons
 * 
 * @apiQuery {String} language Language of the server responses: spanish | english.
 * @apiQuery {String} [name] Name of the pokemon in the database.
 * @apiQuery {String} [public] Send if you want to filter by publicity of the items only receive: true | false.
 * @apiquery {Number} [nationalPokedexNumber] Send it if you want to filter by national pokedex number.
 * @apiQuery {String} [createdByUser] Send it if you want to filter by the pokemons that you created, it receives: true | false.
 * @apiQuery {Number} [page] Send it if you want to use pagination, send it always with limit, send the page you are currently at.
 * @apiQuery {Number} [LIMIT] Send it if you want to use pagination, send it always with page, send the limits of items you want to send.
 * 
 * @apiSuccess (200) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (200) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (200) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (200) {String} content.message Response short message about the request response.
 * @apiSuccess (200) {Array} content.data Response data could be any type of variable.
 * @apiSuccess (200) {String} content.data.name Name of the pokemon in the database.
 * @apiSuccess (200) {Object} content.data.pokedexNumber Object that contains diferent pokedex numbers in the database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.national Number of the pokemon in the national pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.johto Number of the pokemon in the johto pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.hoenn Number of the pokemon in the hoenn pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.sinnoh Number of the pokemon in the sinnoh pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.kalos Number of the pokemon in the kalos pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.alola Number of the pokemon in the alola pokedex on database.
 * @apiSuccess (200) {String[]} content.data.types Types of the pokemon in the database.
 * @apiSuccess (200) {Number} content.data.generation Generation of the pokemon in the database.
 * @apiSuccess (200) {Boolean} content.data.public Determines if the pokemon will be public or not.
 * @apiSuccess (200) {String} content.data._id Is the identificator of mongoDB.
 * @apiSuccess (200) {Date} content.data.createdAt Date of creation of the document in the DB.
 * @apiSuccess (200) {Date} content.data.createdAt Date of update of the document in the DB.
 * @apiSuccess (200) {Date} content.data.__v Version of document on mongoDB.
 * 
 * @apiSuccessExample (200) {Json} Success Response:
 * 
 *  [{
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Busqueda de Pokemons con exito",
 *          "data": {
 *              "name": "Prueba Alvaro 1",
 *              "pokedexNumber": {
 *                  "national": 301,
 *                  "johto": null,
 *                  "hoenn": 301,
 *                  "sinnoh": null,
 *                  "kalos": null,
 *                  "alola": null,
 *                  "_id": "62faa1601f0139a80aea08d8"
 *              }
 *              "types": [
 *                  "PLANTA"
 *              ],
 *              "generation": 2,
 *              "createdBy": "aaperafan@gmail.com",
 *              "public": true,
 *              "_id": "62faa1601f0139a80aea08d7",
 *              "createdAt": "2022-08-15T19:41:20.157Z",
 *              "updatedAt": "2022-08-15T19:41:20.157Z",
 *              "__v": 0
 *          }
 *      }
 *  }]
 * 
*/ 
router.get('/findAllPokemons', verifyToken, validate('findAllPokemons'), PokemonController.findAllPokemons)

/** 
 * @api {get} api/pokemon/findOnePokemon Find One Pokemon
 * @apiVersion 1.0.0
 * @apiGroup Pokemon
 * @apiName Find One Pokemon
 * @apiDescription Service that find one Pokemon by it's name. 
 * 
 * @apiHeader {String} Authorization The token that is bringed on login.
 * 
 * @apiSampleRequest  http://localhost:3000/api/pokemon/findOnePokemon
 * 
 * @apiQuery {String} language Language of the server responses: spanish | english.
 * @apiQuery {String} [data] Full name or part of the name of the pokemon in the database.
 * 
 * @apiSuccess (200) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (200) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (200) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (200) {String} content.message Response short message about the request response.
 * @apiSuccess (200) {Array} content.data Response data could be any type of variable.
 * @apiSuccess (200) {String} content.data.name Name of the pokemon in the database.
 * @apiSuccess (200) {Object} content.data.pokedexNumber Object that contains diferent pokedex numbers in the database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.national Number of the pokemon in the national pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.johto Number of the pokemon in the johto pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.hoenn Number of the pokemon in the hoenn pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.sinnoh Number of the pokemon in the sinnoh pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.kalos Number of the pokemon in the kalos pokedex on database.
 * @apiSuccess (200) {Number} content.data.pokedexNumber.alola Number of the pokemon in the alola pokedex on database.
 * @apiSuccess (200) {String[]} content.data.types Types of the pokemon in the database.
 * @apiSuccess (200) {Number} content.data.generation Generation of the pokemon in the database.
 * @apiSuccess (200) {Boolean} content.data.public Determines if the pokemon will be public or not.
 * @apiSuccess (200) {String} content.data._id Is the identificator of mongoDB.
 * @apiSuccess (200) {Date} content.data.createdAt Date of creation of the document in the DB.
 * @apiSuccess (200) {Date} content.data.createdAt Date of update of the document in the DB.
 * @apiSuccess (200) {Date} content.data.__v Version of document on mongoDB.
 * 
 * @apiSuccessExample (200) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Busqueda de Pokemon con exito",
 *          "data": {
 *              "name": "Prueba Alvaro 1",
 *              "pokedexNumber": {
 *                  "national": 301,
 *                  "johto": null,
 *                  "hoenn": 301,
 *                  "sinnoh": null,
 *                  "kalos": null,
 *                  "alola": null,
 *                  "_id": "62faa1601f0139a80aea08d8"
 *              }
 *              "types": [
 *                  "PLANTA"
 *              ],
 *              "generation": 2,
 *              "createdBy": "aaperafan@gmail.com",
 *              "public": true,
 *              "_id": "62faa1601f0139a80aea08d7",
 *              "createdAt": "2022-08-15T19:41:20.157Z",
 *              "updatedAt": "2022-08-15T19:41:20.157Z",
 *              "__v": 0
 *          }
 *      }
 *  }
 * 
*/ 
router.get('/findOnePokemon', verifyToken, validate('findOnePokemon'), PokemonController.findOnePokemon)

/** 
 * @api {put} api/pokemon/updateOnePokemon Update One Pokemon
 * @apiVersion 1.0.0
 * @apiGroup Pokemon
 * @apiName Update One Pokemon
 * @apiDescription Service that update a single Pokemon.
 * 
 * @apiSampleRequest  http://localhost:3000/api/pokemon/updateOnePokemon
 * 
 * @apiHeader {string} Authorization The token that is bringed on login.
 * 
 * @apiQuery {string} language Language of the server responses: spanish | english.
 * 
 * @apiBody {String} id Is the ObjectId of the Pokemon in the database.
 * @apiBody {String} [name] Name of the Pokemons .
 * @apiBody {Number} [generation] Number of the pokemon in the national pokedex. It should be unique.
 * @apiBody {Number} [nationalPokedexNumber] Number of the generation which the pokemon belongs.
 * @apiBody {Boolean} [public] Defines if the pokemon will be public or not.
 * 
 * @apiParamExample {json} Request Example:
 *  {
 *       "id": "62fa51479c01d3340b5b66b2"
 *       "name": "Prueba Alvaro 1",
 *       "generation": 1,
 *       "nationalPokedexNumber": 3005,
 *       "public": true
 *   }
 * 
 * @apiSuccess (201) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (201) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (201) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (201) {String} content.message Response short message about the request response.
 * @apiSuccess (201) {Object} content.data Response data could be any type of variable.
 * @apiSuccess (201) {Boolean} content.data.acknowledged Show if the update was acknowledged.
 * @apiSuccess (201) {Number} content.data.modifiedCount Numbers of objects were modified.
 * @apiSuccess (201) {String} content.data.upsertedId Id of the document upserted (Null on updates).
 * @apiSuccess (201) {Number} content.data.upsertedCount Number of objects upserteds (0 on updates).
 * @apiSuccess (201) {Number} content.data.matchedCount Number of matched Pokemons in the querys.
 * 
 * @apiSuccessExample (201) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Actualización de pokemon con exito",
 *          "data": {
 *              "acknowledged": true,
 *              "modifiedCount": 1,
 *              "upsertedId": null,
 *              "upsertedCount": 0,
 *              "matchedCount": 1
 *          }
 *      }
 *  }
 * 
*/ 
router.put('/updateOnePokemon', verifyToken, validate('updateOnePokemon'), PokemonController.updateOnePokemon)

/** 
 * @api {delete} api/pokemon/deleteOnePokemon Delete One Pokemon
 * @apiVersion 1.0.0
 * @apiGroup Pokemon
 * @apiName Delete One Pokemon
 * @apiDescription Service that delete a single Pokemon.
 * 
 * @apiSampleRequest  http://localhost:3000/api/pokemon/deleteOnePokemon
 * 
 * @apiHeader {string} Authorization The token that is bringed on login.
 * 
 * @apiQuery {string} language Language of the server responses: spanish | english.
 * 
 * @apiBody {String} id Is the ObjectId of the Pokemon in the database.
 * 
 * @apiParamExample {json} Request Example:
 *  {
 *       "id": "62fa51479c01d3340b5b66b2"
 *   }
 * 
 * @apiSuccess (200) {Boolean} success Determines if the request was successful or not.
 * @apiSuccess (200) {Number} code Response interal code for success or exceptions.
 * @apiSuccess (200) {Object} content Response object that contains message and/or data when is required.
 * @apiSuccess (200) {String} content.message Response short message about the request response.
 * @apiSuccess (200) {Object} content.data Response data could be any type of variable.
 * @apiSuccess (200) {Boolean} content.data.acknowledged Show if the delete was acknowledged.
 * @apiSuccess (200) {Number} content.data.deletedCount Numbers of objects were deleted.
 * 
 * @apiSuccessExample (200) {Json} Success Response:
 * 
 *  {
 *      "success": true,
 *      "code": 0,
 *      "content": {
 *          "message": "Actualización de pokemon con exito",
 *          "data": {
 *              "acknowledged": true,
 *              "deletedCount": 1,
 *          }
 *      }
 *  }
 * 
*/ 
router.delete('/deleteOnePokemon', verifyToken, validate('deleteOnePokemon'), PokemonController.deleteOnePokemon)

//This route doesn't have documentation because is only used to upload pokemons on the database
router.post('/uploadDefaultPokemons', PokemonController.uploadDefaultPokemons)