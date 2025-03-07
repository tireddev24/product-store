import express from 'express'

import { createProduct, getProducts, updateProduct,
     deleteProduct, getSearchedProduct, updateFav } from '../controllers/product.controller.js';

const router = express.Router()

router.get("/", getProducts)

router.get("/:id", getSearchedProduct)

router.post("/", createProduct )

router.put("/:id", updateProduct )

router.put("/fav/:id", updateFav )

router.delete("/:id", deleteProduct )


export default router