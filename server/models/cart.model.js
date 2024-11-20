import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        
        },
       
    ],
   createdAt:{type:Date,default:Date.now()},
   updatedAt:{type:Date,default:Date.now()}

})
const Cart = mongoose.model('Cart',cartSchema);
export default Cart