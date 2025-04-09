import express from 'express'
import { AddCart, getProducts, removeProduct, allCartedProducts } from '../controllers/cart.controller.js'

const router = express.Router()


router.delete('/removefromcart/:id', removeProduct)

router.get('/getcart/:id', getProducts)

router.post('/addtocart', AddCart)

router.get('/allcart', allCartedProducts)

export default router