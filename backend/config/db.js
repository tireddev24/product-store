import mongoose from "mongoose"


export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'product_store'
        })
        console.log(`DB Connected: ${conn.connection.port}`) //for debugging
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1);  // process code 1 means failure, code 0 means success
    }
}