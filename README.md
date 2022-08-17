# **Readme Prueba Técnica 57Blocks**

This Rest API is deesigned to fullfill all the requirements of the technique test that 57Blocks presents. 

The theme selected for this app are the Pokemons so the data saved on the database are Pokemons!

## **Aplication Info**

<p align="center">
  <a href="https://legalaidemo.com/" target="blank"><img src="https://brandslogos.com/wp-content/uploads/thumbs/nodejs-logo-vector.svg" width="512" alt="LegalAI Logo" /></a>
</p>
<p align="center">
  <a href="https://legalaidemo.com/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="128" alt="LegalAI Logo" /></a>
  <a href="https://legalaidemo.com/" target="blank"><img src="https://cdn.iconscout.com/icon/free/png-256/javascript-2752148-2284965.png" width="128" alt="LegalAI Logo" /></a>
</p>

The application is developed on Nodejs as the runtime environment. It is coded on TypeScript and compiled on JavaScript. Also this application use environment variables to diferent functionalities as db conections, and authorization. the .env file should be copied on the base folder of the project (as the same level of this file). To open the documentation you should open the apidoc folder after run de documentation command (showed below) and open index.html file on a browser. Also, this API supports two languages for the requests, in terms of validation and logs of the API you can choose them by changing the .env variable, and for the responses of the requests a param in query named language should be sent.

### **Requirements**
- Git installed on the computer
- Nodejs version 14.17.6
- Node package manager (npm) version 6.14.15


### **Steps to run the app:**
In order to run the application follow the next steps:
1. clone the git repository using the following command: 
```bash
PS C:/../../57-blocks-prueba-tecnica> git clone https://github.com/Alvaro850/57blocks-prueba-tecnica/
```
2. Then switch to the branch called "master" you can use the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> git checkout origin master
```
3. Then copy the .env file in the main directory.
4. Now you shoul install all the packages with the command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm i
```
5. Next you should build the application in order to start it in production mode.
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run build
```
6. At the end you should start the app with the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run start
```

You should see a message like this:
```
PS C:/../../57-blocks-prueba-tecnica> [INFO] August 16th 2022, 8:19:36 pm - [Aplicación]: Server is running on http://localhost:3000
```

## **Database**

<p align="center">
  <a href="https://legalaidemo.com/" target="blank"><img src="https://umangsoftware.com/wp-content/uploads/2020/05/MongoDB-logo.png" width="512" alt="LegalAI Logo" /></a>
</p>

The database used in this project is a non-relational database in this case MongoDB. This database is a cluster on Mongo Atlas so it is on the cloud so anyone with the credentials can access to it.
I've decided to use Mongo because when working with web apps the fastest way to save info and get it is with a Database that saves documents, so mongo was the best options, also it is not required anything relationed with audits so a SQL database will not bring too much benefits.

### **Collections**

For this technical test i will add the collections that are used on the database, actually two.

#### **Users Collection**

Field | Type | Description 
:---: | :---: | :---:
email | String | Email of the user.
password | String | Password of the user it is encrypted.
confirmed | Boolean | This is an option to confirm user email, but it isn't implemented.
enabled | Boolean | This is an option that allows a user to login, but it isn't implemented.
createdAt | Date | This field contains the date of the creation of the user.
updatedAt | Date | This field contains the date of the last update of the document.

#### JSON EXAMPLE:
```json
{
    "email": "aaperafan@gmail.com",
    "password": "$2b$10$yp72gTHwp22t4O.z1Mncqu6byDQm141vyR7eZmVqzYaTqgnsLd0By",
    "confirmed": false,
    "enabled": true,
    "createdAt": {
        "$date": "2022-08-13T22:24:56.197Z"
    },
    "updatedAt": {
        "$date": "2022-08-13T22:24:56.197Z"
    }
}
```

#### **Pokemons Collection**

Field | Type | Description 
:---: | :---: | :---:
name | String | Name of the pokemon.
pokedexNumber | Object | Object that contains diferent regions pokedex numbers.
types | Array | Array that contains strings of the pokemon types.
generation | Number | Generation where first appeared the pokemon.
createdBy | String | Email of the user that created the pokemon (if it was created by an user).
public | Boolean | Determines if the pokemon is public or not.
createdAt | Date | This field contains the date of the creation of the user.
updatedAt | Date | This field contains the date of the last update of the document.

#### ***pokedexNumber subDocument***

Field | Type | Description 
:---: | :---: | :---:
national | Number | Number of the pokemon in the national pokedex.
johto | Number | Number of the pokemon in the johto pokedex.
hoenn | Number | Number of the pokemon in the hoenn pokedex.
sinnoh | Number | Number of the pokemon in the sinnoh pokedex.
kalos | Number | Number of the pokemon in the kalos pokedex.
alola | Number | Number of the pokemon in the alola pokedex.

#### JSON EXAMPLE:
```json
{
    "name": "Bulbasaur",
    "pokedexNumber": {
        "national": 1,
        "johto": 226,
        "hoenn": null,
        "sinnoh": null,
        "kalos": 80,
        "alola": null,
    },
    "types": [
        "PLANTA",
        "VENENO"
    ],
    "generation": 1,
    "createdBy": null,
    "public": true,
    "createdAt": {
        "$date": "2022-08-15T00:35:01.525Z"
    },
    "updatedAt": {
        "$date": "2022-08-15T00:35:01.525Z"
    }
}
```

## **Auth Service**

<p align="center">
  <a href="https://legalaidemo.com/" target="blank"><img src="https://seeklogo.com/images/J/JWT-logo-6EF166A3CC-seeklogo.com.png" width="300" alt="LegalAI Logo" /></a>
</p>

In order to authenticate users to allow then to query our data it's necessary to send a Json Web Token that is bringed when the user login on the platform. It should be always sent when query pokemons by headers.

To create an account there are some requirements:
- The email address should be a valid email address and shoukd not be registered in the database.
- Password should have upper and lower case, with a minimun length of 10 characters and have one of the following characters ! @ # ? ].

#### **Header Example**
```json
{ "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhcGVyYWZhbkBnbWFpbC5jb20iLCJpYXQiOjE2NjA1MTU0NjIsImV4cCI6MTY2MDUxNjY2Mn0.GhISM04FNBFuSiPKFS49OrO0UiqGFv2ihaVHSe0c-Rk" }
```

## **Diferents Application Commands**

In order to start the application on developer mode, use the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run start:dev 
```

In order to build the application (it is necessary because typescript couldn't be compiled by node) use the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run build
```

In order to debug the code use the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run start:debug
```

In order to run the documentation use the following command: 
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run start:doc
```

In order to run the coded builded use the following command:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run start
```

To start the application on the correctly way follow this commands:
```bash
PS C:/../../57-blocks-prueba-tecnica> npm run build
PS C:/../../57-blocks-prueba-tecnica> npm run start
```