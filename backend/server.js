import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'

dotenv.config() //parses env file to readable format

const app = express()

const port =  process.env.PORT

const __dirname = path.resolve()

app.use(cors())

app.use(express.json()) //middleware, allows passing of json

app.use("/api/products", productRoutes)

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
    console.log(`\nServer running at http://localhost:${port}`)
});


