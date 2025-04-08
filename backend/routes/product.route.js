import express from 'express'

import { createProduct, getProducts, updateProduct,
     deleteProduct, getSearchedProduct, updateFav, profileProducts } from '../controllers/product.controller.js';

const router = express.Router()

router.get("/", getProducts)

router.get("/search/:id", getSearchedProduct)

router.get('/profile/:id', profileProducts)

router.post("/create", createProduct )

router.put("/:id", updateProduct )

router.put("/profile/edit/:id", updateProduct )


router.put("/fav/:id", updateFav )

router.delete("/:id", deleteProduct )


export default router