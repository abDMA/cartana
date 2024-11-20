import mongoose from "mongoose";
const transactionSchema = mongoose.Schema({
    giftCard:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"GiftCard",
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        },
        buyer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        amount:{
            type:Number,
        },
        status:{
            type:String,
            enum:['pending','completed','canceled'],
            default:'pending'
        },
        paymentStatus:{
            type:String,
            enum:['card','paypal']
        }
},{timeStamp:true})
const Transaction = mongoose.model("Transaction",transactionSchema)
export default Transaction