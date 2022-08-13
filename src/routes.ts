import express from 'express'
export const router = express.Router()

import { router as userRoutes } from './modules/users/users.routes'

router.use('/users', userRoutes)
