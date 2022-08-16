import express from 'express'
export const router = express.Router()

import { router as userRoutes } from './modules/users/users.routes'
import { router as authRoutes } from './modules/auth/auth.routes'
import { router as pokemonRoutes } from './modules/pokemons/pokemons.routes'
router.use('/users', userRoutes)
router.use('/auth', authRoutes)
router.use('/pokemon', pokemonRoutes)