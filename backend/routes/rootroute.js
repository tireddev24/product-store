import {Router} from 'express'
import productRoutes from './product.route.js'
import userRoutes from './user.route.js'
import authRoutes from './authroute.js'
import cartRoutes from './cart.route.js'


const router = Router()

router.use("/products", productRoutes)
router.use("/users", userRoutes)
router.use("/auth", authRoutes)
router.use('/cart', cartRoutes)


export default router