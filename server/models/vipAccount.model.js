import mongoose from "mongoose";
const vipAccount = mongoose.Schema(({
    user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    totalEarnings:{
        type:Number,
        default:0
    },
    availableBalnce:{
        type:Number,
        default:0
    },
    withdrawalHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"withdrawal"

    }]
}))
const VipAccount = mongoose.model('VipAcount',vipAccount);
export default VipAccount