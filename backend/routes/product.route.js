import express from 'express'

import { createProduct, getProducts, updateProduct, deleteProduct, getSearchedProduct } from '../controllers/product.controller.js';

const router = express.Router()

router.get("/", getProducts)

router.get("/:id", getSearchedProduct)

router.post("/", createProduct )

router.put("/:id", updateProduct )

router.delete("/:id", deleteProduct )


export default router