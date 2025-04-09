import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcryptjs'
import { connectDB } from '../config/db.js';
import { JWT_SECRET } from "../secrets.js";


export const signup = async (req, res) => {

    try {
        await connectDB()

        const userData = await User.findOne({email: req.body.email})     
        
        if(userData){
            return res.status(400).json({success: false, message: "A userData with this email already exists"})
        }        
        
        const newUser = await User.create({
            ...req.body,
            email:req.body.email.toLower(),
            username: req.body.email.slice(0, req.body.email.indexOf("@")),
            password: hashSync(req.body.password, 10)
        })


        //JWT JSON web token
        const token = jwt.sign({id: newUser._id}, JWT_SECRET)
       

       //remove unwanted fields
        const{password, $__, $isNew, ...user} = newUser._doc

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user,
            expire: 1000
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, message: "Unable to register userData"})
    }
}



export const login = async (req, res) => {

    const {email, password : user_password} = req.body

    try {
        await connectDB()
        
        const userData = await User.findOne({email})
        
        if(!userData) {
            res.status(404).json({success: false, message: "User not found"})
            return        
        }

        if(!compareSync(user_password, userData.password)){
            res.status(401).json({success: false, message: "Incorrect password"})
            return
        }
       //remove unwanted fields
        const{password, $__, $isNew, ...user} = userData._doc

        const token = jwt.sign({id: userData._id}, JWT_SECRET)

        res.status(200).json({
            success: true, 
            token, 
            message: "Logged in successfully!", 
            user,
            expire: 1000
        })
        
    } catch (error) {   
        console.log(error);
        return res.status(500).json({success: false, message: "Unable to login successfully"})
    }


}