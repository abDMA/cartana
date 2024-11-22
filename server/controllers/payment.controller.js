import CardOrder from '../models/cardOrder.model.js'
import { stripe } from "../lib/stripe.js";
import User from "../models/user.model.js";
import GiftCard from "../models/card.model.js";
import { sendCardsToCustomer } from '../mailTrap/email.js.js';
let chosenSerials =[]
let chosenCards = []
export const createCheckoutSession = async (req, res) => {
	
	try {
		const { giftCards } = req.body;
		if (!Array.isArray(giftCards) || giftCards.length === 0) {
			return res.status(400).json({ error: "Invalid or empty giftCards array" });
		}
		for (const {_id,quantity,price,cardName,cardImg} of giftCards){
			const giftCard = await GiftCard.findById(_id)			
			let availableSerials = giftCard?.serialNumber?.filter((serial)=> serial?.status === 'available')
			 let availableQuantity = Math.min(quantity,availableSerials?.length)
			for (let i = 0; i < availableQuantity; i++) {
				const selectSerial = availableSerials?.pop()
				const isAleadyShosen  = chosenSerials.some(card => card.serial === selectSerial.serial)
				const isCardchosen = chosenCards.some(card =>card._id === _id)
				if (!isCardchosen) {
					chosenCards.push({
						_id,
						cardName,
						cardImg,
						price,
						quantity:availableQuantity})
				}
				if (!isAleadyShosen) {
					chosenSerials.push({
						_id,
						Name:giftCard.cardName,
						img:giftCard.cardImg,
						serial:selectSerial?.serial,
						quantity:availableQuantity
					}
				)
				}
				
			}
		}	
		let totalAmount = 0;
		const lineItems = chosenCards?.map((giftCard) => {
			const amount = Math.round(giftCard.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * giftCard.quantity;
			
			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: giftCard.cardName,
						images: [giftCard.cardImg],
					},
					unit_amount: amount,
				},
				quantity: giftCard.quantity || 1,
			};
		});
		

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card','amazon_pay'],
		line_items: lineItems,
		mode: "payment",
		success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
		metadata: {
			userId: req.user._id.toString(),
			giftCards_data: JSON.stringify(
				giftCards.map((p) => ({
					id: p._id,
					quantity: p.quantity,
					price: p.price,
				}))
			),

		},
	});
	
	res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
		
		
		
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const checkOutSuccess = async (req, res) => {
	try {
	
		const { sessionId } = req.body;
		const session = await stripe.checkout.sessions.retrieve(sessionId);		
		if (session.payment_status === "paid") {
			// create a new Order
			const giftCards = JSON.parse(session.metadata.giftCards_data);
			const buyerId = session.metadata.userId
			let sellerId
			const sellerAmountsMap = new Map()
			for (const {id,quantity,price} of giftCards) {
				const totalAmount = price * quantity
				const giftCard = await GiftCard.findById(id)
				if(!giftCard) throw new Error('لم يتم العثور على البطاقة')
				sellerId = giftCard.seller
				for (const serial of chosenSerials){
					await GiftCard.updateOne(
						{'serialNumber.serial':serial.serial},
						{$set:{'serialNumber.$.status':'sold'}}
					)
				
				  }
				  giftCard.stock -= serial.quantity
				  if (giftCard.stock <= 0) {
					  giftCard.stock = 0
					  giftCard.availibilty ='غير متوفر'
				  } 
				await giftCard.save()
			sellerAmountsMap.set(sellerId,(sellerAmountsMap.get(sellerId)||0)+totalAmount)
			}
			const newOrder = new CardOrder({
				buyer:buyerId,
				giftCards: giftCards.map((giftCard) => ({
				giftCard: giftCard.id,
				quantity: giftCard.quantity,
				price: giftCard.price,
				})),
				totalPrice: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
				paymentStatus:'completed',
				seller:sellerId,
				createdAt: Date.now(),
			});
			await newOrder.save();
			const seller = await User.findById(sellerId)
			
			if (seller && seller.userType !== 'regular') {
				seller.balance += session.amount_total /100,
				seller.orderId.push(newOrder._id)
				await seller.save()
			}
			
			await sendCardsToCustomer(req.user.email,chosenSerials)
			chosenCards =[]
			res.status(200).json({
				success: true,
		     	message: "Payment successful, order created."
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};



