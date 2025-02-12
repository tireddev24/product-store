import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json({success: true, data: products})
    } catch ( error) {
        console.log("error in fetching products: ", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const getSearchedProduct = async (req, res) => {

    const {id} = req.params

    try {
        const products = await Product.find({_id: id})
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(`error in fetching searched product`)
        res.status(500).json({success: false, message: 'Could not fetch searched data'})
    }
}

export const createProduct = async (req, res)=> {
    const product = req.body
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }
    const newProduct = new Product(product)

    try {
        await newProduct.save()
        res.status(201).json({success: true, data: newProduct, message: "New Product created!"})
    } catch (error) {
        console.error(`Error in Create Product ${error.message}`)
        res.status(500).json({success: false, message: 'Product not created'})
    }
}

export const updateProduct = async (req, res) => {
    const {id} = req.params

    const product = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({  success: true, data: updatedProduct, message: "Product successfully updated" });
    } catch (error) {
        res.status(500).json({  success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id"})
    }

    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Product deleted"})
    } catch (error) {
        res.status(500).json({success: false, message: "Product could not be deleted"})
    }
    console.log("id: "+id)

}

