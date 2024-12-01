import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userPicture: {
        type: String,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum:["regular","VIP","admin"],
        default: "regular"
    },
    balance: {
        type: Number,
        default: 0
    },
 
    isVerified:{
        type:Boolean,
        default:false
    },
    chosenCards: [
         { Name: String, 
            img: String,
            price:Number,
            cardType: String,
             serial:{
                type:String,
                unique:true
             }, 
            isRedeemed: 
            { type: Boolean, 
            default: false } } ],
   redeemCards:[{ type: String }],
    orderId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'CardOrder'
    }],
     createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordTokenxpireAt:Date,
    verificationToken:String,
    verificationTokenExpire:Date,
})
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
        try {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password,salt)
            next()

        } catch (error) {
            next(error)
        }
       if(this.userType !== 'VIP' && this.userType !== 'admin'){
        this.balance = undefined
        this.orderId = undefined
       }
        
})
userSchema.methods.comparePassword = async function(password){
    return  bcrypt.compare(password,this.password)
}
const User = mongoose.model("User",userSchema);
export default User