import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required:true
    }, 
    price: {
        type : Number,
        required: true
    }, 
    image : {
        type : String,
        required: true
    },
    fav : {
        type : Boolean,
        required: false
    }
}, {
    timestamps: true
}
)


const Product = mongoose.model('products', productSchema)


export default Product

