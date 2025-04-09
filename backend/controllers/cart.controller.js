import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { connectDB } from '../config/db.js';




export const getProducts = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid Product Id"})   
         }

    try {
        await connectDB()
        
        const prod = await Cart.find({cartowner: id}).populate('cartowner').populate('products').populate('owner')
        
        if(prod.length === 0){
            return res.status(200).json({success: true, message: "No products in cart", cart: []})
        }
        
        return res.status(200).json({success: true,  message: "Fetched products in cart", 
            cart: prod.map(product => {
                return {
                    cartItemId:product._id,
                    _id: product.products._id,
                    name: product.products.name,
                    image: product.products.image,
                    price: product.products.price,
                    fav: product.products.fav,
                    createdAt: product.products.createdAt,
                    updatedAt: product.products.updatedAt,
                    cartowner: {
                        _id: product.cartowner._id, 
                        firstname: product.cartowner.firstname,
                        lastname:product.cartowner.lastname,
                        email: product.cartowner.email
                    },
                    owner: {
                        _id: product.owner._id,
                        firstname: product.owner.firstname,
                        lastname: product.owner.lastname,
                        email: product.owner.email
                    }
                   
                }
            }),
            // data: prod
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Unable to get cart products"})
    }
}

export const AddCart = async (req, res) => {

    const {productId, cartownerId, prodownerId} = req.body

    const newCart = new Cart({
        cartowner: cartownerId,
        products: productId,
        owner: prodownerId
    })

    try {
        await connectDB()

         await newCart.save()
        const prod =  await Product.findById(productId)
        res.status(200).json({success: true, message: `${prod.name} added to cart`, data: {name: prod.name}})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Unable to add product to cart"})
    }


}


export const removeProduct = async (req, res) => {

    const {id} = req.params

    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: "Invalid Product Id"})   
         }

    try {
        await connectDB()

        const prod = await Cart.findByIdAndDelete({_id: id})
        return res.status(200).json({success: true, data:prod, message:"Removed from cart"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Unable to remove product from cart"})
    }
}

export const allCartedProducts = async (req, res) => {

    try {
        await connectDB()

        const cart = await Cart.find().populate('cartowner').populate('products').populate('owner')

                
        if(cart.length === 0){
            return res.status(200).json({success: true, message: "No products in cart", cart: []})
        }

        return res.status(200).json({success: true,  message: "Fetched products in cart", cart })


        
    } catch (err) {
        console.log(err)
        return res.status(500).json({success: false, message: "Unable to get all products in cart"})

    }
}