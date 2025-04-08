import mongoose from "mongoose";

const {Schema, model, models} = mongoose;

const productSchema = new Schema({
    owner : {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
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


const Product = models.Products || model('Products', productSchema)


export default Product

