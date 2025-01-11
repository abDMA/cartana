import axios from 'axios'
import GiftCard from '../models/card.model.js';
import User from '../models/user.model.js';
let chosenSerials = [];
let chosenCards = [];
let totalAmount = 0;
import NodeCache from 'node-cache';
import CardOrder from '../models/cardOrder.model.js';
import { sendCardsToCustomer } from '../mailTrap/email.js.js';
const cache = new NodeCache({ stdTTL: 300 });
const generateAccessToken = async () => {
    const response = await axios({
        url: `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
        method: 'post',
        data: 'grant_type=client_credentials',
        auth: {
            username: process.env.PAYPAL_CLIENT_ID,
            password: process.env.PAYPAL_SECRET
        }
    });

    return response.data.access_token;
};
 const test = async (giftCards) => {
chosenSerials = [];
chosenCards = [];
totalAmount = 0;
    if (!Array.isArray(giftCards) || giftCards.length === 0) {
      return null;
    }
    for (const { _id, quantity, price, cardName, cardImg } of giftCards) {
      totalAmount += price * quantity;
      const giftCard = await GiftCard.findById(_id);
      const availableSerials = giftCard?.serialNumber?.filter(
        (serial) => serial?.status === "available"
      );
      const availableQuantity = Math.min(quantity, availableSerials?.length);
      for (let i = 0; i < availableQuantity; i++) {
        const selectSerial = availableSerials?.pop();
        if (
          !chosenSerials.some((serial) => serial.serial === selectSerial.serial)
        ) {
          chosenSerials.push({
            _id,
            Name: giftCard.cardName,
            img: giftCard.cardImg,
            serial: selectSerial?.serial,
            price,
            cardType: giftCard.cardType,
            quantity: availableQuantity,
          });
        }
        if (!chosenCards.some((card) => card._id === _id)) {
          chosenCards.push({
            _id,
            cardName,
            cardImg,
            price,
            quantity: availableQuantity,
          });
        }
      }
    }
cache.set("chosenCards", chosenCards);
cache.set("chosenSerials",chosenSerials)

}
const createOrder = async () => {  
    const accessToken = await generateAccessToken();
    const response = await axios({
        url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        data: JSON.stringify({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: totalAmount,
                        breakdown: {
                            item_total: {
                                currency_code: 'USD',
                                value: totalAmount
                            }
                        }
                    }
                }
            ],
            application_context: {
                return_url:`${process.env.CLIENT_URL}/purchase-success`,
                cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
                shipping_preference: 'NO_SHIPPING',
                user_action: 'PAY_NOW',
                brand_name: 'Marveleza'
            }
        })
    });
    const data = response.data.id
    return data
};

const capturePayment = async (orderId,req,res) => {
    try {
    const chosenCards2= cache.get("chosenCards");
    const chosenSerials2 = cache.get("chosenSerials");
    const existingOrder = await CardOrder.findOne({stripeSessionId: orderId });

      if (orderId &&!existingOrder) {
          let sellerId
          let buyerId = req.user?._id.toString()
          const sellerAmountsMap = new Map();
          for (const { _id } of chosenCards2) {
            const giftCard = await GiftCard.findOne({_id});
             sellerId = giftCard.seller;
            sellerAmountsMap.set(
              sellerId,
              (sellerAmountsMap.get(sellerId) || 0) + totalAmount
            );
          }
          const newOrder = new CardOrder({
            buyer: buyerId,
            giftCards: chosenCards2.map((giftCard) => ({
              giftCard: giftCard._id,
              quantity: giftCard.quantity,
              price: giftCard.price,
            })),
            totalPrice:totalAmount,
            paymentStatus: "completed",
            seller: sellerId,
            stripeSessionId: orderId,
            createdAt: Date.now(),
          
          });
          await newOrder.save();
          const seller = await User.findById(sellerId);
          if (seller && seller.userType !== "regular") {
            seller.balance += totalAmount;
            seller.orderId.push(newOrder._id);
            await seller.save();
          }
          
            for (const serial of chosenSerials2){
                    await GiftCard.updateOne(
                        {'serialNumber.serial':serial.serial},
                        {$set:{'serialNumber.$.status':'sold'}}
                    )
            
                    const result = await GiftCard.updateOne(
                        {_id:serial._id},
                        {$inc:{stock: -serial.quantity}}
                    )
            
                    if (result.modifiedCount >0) {
                        const card = await GiftCard.findOne({
                            _id:serial._id
                        })
                        if(card && card.stock <= 0) {
                            await GiftCard.updateOne(
                                {_id:serial._id},
                                {$set:{availibilty:'غير متوفر',stock:0}}
                            )
                        }
                    }
                    
                  }
                const user = await User.findById(buyerId);
                 user.chosenCards.push(...chosenSerials2.map(serial => ({ Name: serial.Name, img: serial.img, serial: serial.serial,price:serial.price,cardType:serial.cardType, isRedeemed: false }))); 
                 await user.save();
                 await sendCardsToCustomer(req.user.email,chosenSerials2)
                 
          cache.del("chosenCards");
          cache.del("chosenSerials"); 
          
        
                  }
                  else{
          return res.status(400).json({ success: false, message: "Order already exists." });
        }
    } catch (error) {
      console.log("error",error.message);
      
    }
   
   
};

export { createOrder, capturePayment,test };
