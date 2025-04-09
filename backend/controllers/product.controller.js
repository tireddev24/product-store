import Product from '../models/product.model.js'
import { connectDB } from '../config/db.js';
import mongoose from 'mongoose'

export const getProducts = async (req, res) => {


    try{
        await connectDB()
        
        const products = await Product.find({}).populate('owner')
        res.status(200).json({success: true, data: products})
    } catch ( error) {
        console.log("error in fetching products: ", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const getSearchedProduct = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid Product Id"})
    }

    try {
                await connectDB()
        
        const products = await Product.find({_id: id})
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(`error in fetching searched product`)
        res.status(500).json({success: false, message: 'Could not fetch searched data'})
    }
}

export const createProduct = async (req, res)=> {
    const product = req.body

    if(!product.owner){
        return res.status(401).json({success: false, message: "Please login first"})
    }
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false, message: "Please provide all fields"})
    }

    const newProduct = new Product(product)

    try {
        await connectDB()
        
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
        return res.status(400).json({success: false, message: "Invalid Product Id"})
    }

    try {
        await connectDB()
        
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true}).populate('owner')
        console.log(updatedProduct)
        res.status(200).json({  success: true, 
            data: updatedProduct,
            
        message: "Product successfully updated" });
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
        await connectDB()

        await Product.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Product deleted"})
    } catch (error) {
        res.status(500).json({success: false, message: "Product could not be deleted"})
    }
  

}


export const updateFav = async (req, res) => {
    const {id} = req.params

    const favStat = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid Product Id"})
    }

    try {
        const data = await Product.findByIdAndUpdate({_id: id}, {$set:{"fav" : favStat.fav}}, {new: true})
        if(data.fav){
            return res.status(201).json({success: true, data: data, message: "Added to favourites!" })
        }
        else return res.status(201).json({success: true, data: data, message: "Removed from favourites!" })

    } catch (error) {
        return res.status(500).json({success: false, message: "Unable to add to favourites"})
    }


}


export const profileProducts = async (req, res) => {
    
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid Product Id"})
    }

    try{
        await connectDB()

        const prod = await Product.find({owner: id}).populate('owner')

        return res.status(200).json({
            success: true,
            message: "Successfully fetched products",
            product: prod.map(product => {
                return {
                    _id:product._id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    createdAt: product.createdAt,
                    updatedAt: product.updatedAt,
                    owner: {
                        _id: product.owner._id, 
                        firstname: product.owner.firstname,
                        lastname:product.owner.lastname,
                        email: product.owner.email
                    } 
                }
            })
         
        })
    }

    catch (error){
        console.log(error)
        return res.status(500).json({success: false, message: "Unable to fetch products"})
    }


}