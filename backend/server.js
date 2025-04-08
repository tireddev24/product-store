import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/authroute.js'
import cartRoutes from './routes/cart.route.js'

dotenv.config() //parses env file to readable format

const app = express()

const port =  process.env.PORT

const __dirname = path.resolve()

//MIDDLEWARES
app.use(cors())
app.use(express.json()) //middleware, allows passing of json


//ROUTES
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use('/api/cart', cartRoutes)
//ERROR HANDLER
app.use((err, req, res, next) => {
    err.statuCode = err.statuCode || 500
    err.status = err.status || 'error'

    res.status(err.statuCode).json({
        status: err.status,
        message: err.message
    })
})

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")))

//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
//     })
// }
app.get('/', (req, res) => {
    res.json({message: "Server is running"})
})

app.listen(port, () => {
    connectDB()
    console.log(`\nServer is running`)
});


