import CardOrder from "../models/cardOrder.model.js";
import User from "../models/user.model.js";
import GiftCard from "../models/card.model.js";
import { sendCardsToCustomer } from "../mailTrap/email.js.js";
let chosenSerials = [];
let chosenCards = [];
let totalAmount = 0;
import PayTabs from "paytabs_pt2";
import NodeCache from 'node-cache';
const cache = new NodeCache({ stdTTL: 300 });
let profileID = process.env.PAYTABS_PROFILE_ID,
  serverKey = process.env.PAYTABS_SERVER_KEY,
  region = "ARE";

PayTabs.setConfig(profileID, serverKey, region);
export const createCheckoutSession = async (req, res) => {

chosenSerials = [];
chosenCards = [];
totalAmount = 0;
  try {
    const { giftCards } = req.body;
    if (!Array.isArray(giftCards) || giftCards.length === 0) {
      res.status(400).json({ error: "Invalid or empty giftCards array" });
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
    
    let paymentMethods = ["all"];

    let transaction_details = [
        'sale',
        'ecom'
    ];
    
    let cart_details =[
      `GC_${Date.now()}`,
      "AED",
      totalAmount,
       'gift card'
    ]
    
    let customer_details = [
        req.user?.userName,
        req.user?.email,
        '000000000',
    ];
    
    let shipping_address = customer_details;
    
    let response_URLs = [
       `${process.env.SERVER_URL}/api/paytabs/callback`,
       `${process.env.CLIENT_URL}/purchase-success`];
    
    let lang = "ar";
    
    const paymentPageCreated =  function (results) {
      res.status(200).json({ redirect_url: results.redirect_url,trace:results.trace});
  } 

    let frameMode = true;
    
    PayTabs.createPaymentPage(
        paymentMethods,
        transaction_details,
        cart_details,
        customer_details,
        shipping_address,
        response_URLs,
        lang,
        paymentPageCreated,
        frameMode
    ); 

cache.set("chosenCards", chosenCards);
cache.set("chosenSerials",chosenSerials)    
  } catch (error) {
    console.error("Error processing checkout:", error);
    res
      .status(500)
      .json({ message: "Error processing checkout", error: error.message });
  }
};
export const paytabsCallback = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const chosenCards2= cache.get("chosenCards");
    const chosenSerials2 = cache.get("chosenSerials");
    const existingOrder = await CardOrder.findOne({stripeSessionId: sessionId });
    if (sessionId &&!existingOrder) {
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
        stripeSessionId: sessionId,
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
      res
        .status(200)
        .json({ success: true, message: "Payment successful, order created." });
    }else{
      return res.status(200).json({ success: true, message: "Order already processed." }); 
    }

  } catch (error) {
    console.error("Error handling PayTabs callback:", error);
    res
      .status(500)
      .json({
        message: "Error processing payment callback",
        error: error.message,
      });
  }
}
