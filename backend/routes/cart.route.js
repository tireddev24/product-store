import express from 'express'
import { AddCart, getProducts, removeProduct } from '../controllers/cart.controller.js'

const router = express.Router()


router.delete('/removefromcart/:id', removeProduct)

router.get('/getcart/:id', getProducts)

router.post('/addtocart', AddCart)


export default router