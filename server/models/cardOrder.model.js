import mongoose from "mongoose";

const cardOrderSchema = new mongoose.Schema({
  buyer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  giftCards:[
   { 
    giftCard:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"GiftCard",
    required:true
  },
  quantity:{
    type:Number
  },
  price:{
    type:Number
  }
}
],
  totalPrice:{
    type:Number
  },
  currency:{
    type:String,
    default:'usd'
  },
  paymentStatus:{
    type:String,
    enum:['pending','completed','failed'],
    default:'pending'
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  updatedAt:{type:Date
  },
  stripeSessionId: {
    type: String,
    unique:true
  },
},{tameStamps:true});

const CardOrder = mongoose.model('CardOrder',cardOrderSchema);

export default CardOrder
