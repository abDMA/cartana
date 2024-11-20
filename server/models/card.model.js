import mongoose from "mongoose";

const GiftCardSchema = new mongoose.Schema({
cardName:{
        type:String,
        required:[true,'اسم البطاقة مطلوب']
    },
cardImg:{
type:String,
required:[true,'حقل الصورة مطلوب'],
default:'https://www.aptica.com/cdn/shop/products/Unknown_1445x.png?v=1646645411'
},
cardOverView:{
    type:String,
    required:[true,'حقل الوصف مطلوب']
},
serialNumber:[
    {
    serial:{
    type:String,
    required:[true," الرقم السري للبطاقة مطلوبة"],
    unique:true,
},
status:{
    type:String,
    enum:['available','sold'],
    default:'available'
},
}
],
availibilty:{
    type:String,
    enum:["متوفر","غير متوفر"],
    default:"متوفر"
},
cardGenre:{
type:String
},
category:{
    type:String
},
price:{
    type:Number,
    required:[true," القيمة النقدية للبطاقة مطلوبة"],
},
currency:{
    type:String,
    default:"usd"
},
cardType:{
    type:String,
    required:true,
    enum:["reqularCard","VipCard"]
},
stock:{
    type:Number,
},
seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    },
buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
soldAt:{
    type:Date
},

createdAt:{
    type:Date,
    default:Date.now()
}

})
const GiftCard = mongoose.model('GiftCard',GiftCardSchema);
export default GiftCard