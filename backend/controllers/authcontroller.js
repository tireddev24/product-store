import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import AppError from "../utils/appError.js";
import bcrypt from 'bcryptjs'

export const signup = async (req, res, next) => {

    try {
        const user = await User.findOne({email: req.body.email})     
        
        if(user){
            // return res.status(400).json( new AppError("User already exists!", 400))
            return res.status(400).json({success: false, message: "A user with this email already exists"})
        }
        // const name = await User.findOne({username: req.body.username})
        // if(name){
        //     // return res.status(400).json(new AppError("Username in use", 400))
        //     return res.status(400).json({success: false, message: "Username in use"})
        // }   
        
        const hashedPassword = await bcrypt.hash(req.body.password , 12)

        const newUser = await User.create({
            ...req.body,
            username: req.body.email.slice(0, req.body.email.indexOf("@")),
            password: hashedPassword
        })

        //JWT JSON web token
        const token = jwt.sign({id: newUser._id}, 'secretkey123', {
            expiresIn: '90d'
        })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                username: newUser.username,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                email: newUser.email
            },
            expire: 1000
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, message: "Unable to register user"})
    }
}



export const login = async (req, res, next) => {

    const {email, username, password} = req.body

    try {
        const user = await User.findOne({email})
        
        if(!user) {
            // return res.status(404).json(new AppError("User not found", 404))
            return res.status(404).json({success: false, message: "User not found"})
        
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            // return res.status(401).json(new AppError('Incorrect Password', 401))
            return res.status(401).json({success: false, message: "Incorrect password"})
        }

        const token = jwt.sign({id: user._id}, 'secretkey123', {
            expiresIn: '1h'
        })

        res.status(200).json({
            success: true, 
            token, 
            message: "Logged in successfully!", 
            user: {
                _id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            },
            expire: 1000
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Unable to login successfully"})
    }


}