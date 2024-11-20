import GiftCard from "../models/card.model.js";
import cloudinary from "../lib/cloudinary.js";
import CardOrder from "../models/cardOrder.model.js";
export const getAllGiftCards = async (req, res) => {
	try {    
		const searchQuery =  new RegExp(req.query.search, 'i')
		let minPrice = parseFloat(req.query.minPrice) || 0
		let maxPrice = parseFloat(req.query.maxPrice) ||Number.MAX_VALUE
		let page = req.query.page || 1
		let query = {};
		if (req.query.category) {
			const category = new RegExp(req.query.category, 'i') || ""
			query.category = category
		}
		let sortoption ={}
		const sortQuery  = new RegExp(req.query.sort, 'i') 
		if(sortQuery.test('newest')){
			sortoption = {createdAt:-1}
		}else if(sortQuery.test('price-high')){
			sortoption = {price:-1}
		}else if(sortQuery.test('price-low')){
			sortoption = {price:1}
		}
		
		
		query.price = {$gte:minPrice,$lte:maxPrice}
			 const pageSize = 10
			 const skip = (page - 1) * pageSize
		  if (searchQuery) {
			const searchRegex =  new RegExp(req.query.search,'i')
			query['$or'] = [
				{cardName: searchRegex,},
				{cardOverView: searchRegex},
				{cardGenre: searchRegex},
				{cardType: searchRegex},
			]
		   }
		 const giftCard = await GiftCard.find(query).sort(sortoption).skip(skip).limit(pageSize).lean();
		const totalProduct = await GiftCard.countDocuments(query);
		if (!giftCard) {
			return res.status(401).json({ success: false, message: 'لا يوجد بطاقة للبيع' })
		  }
		 giftCard.forEach(async (card) => {
			card.serialNumber.forEach(serial =>
				serial.serial = undefined
			)
			card.isSold = undefined
		})
	const data = {
		giftCard,
		pagination:{
			totalProduct,
			page,
			pages:Math.ceil(totalProduct/pageSize)
		}
		
	}
	
		res.status(200).json({success:true,data})
	  } catch (error) {
	console.log('err with get all product',error);
	res.status(500).json({message:error.message})
	  }
};
export const adminGetAllGiftCards = async (req, res) => {
	try {    
		const searchQuery =  new RegExp(req.query.search, 'i')
		let sortoption  = new RegExp(req.query.sortoption, 'i') || 'lastUpdated'
		let minPrice = parseFloat(req.query.minPrice) || 0
		let maxPrice = parseFloat(req.query.maxPrice) ||Number.MAX_VALUE
		let page = req.query.page || 1
		let query = {};
		query.price = {$gte:minPrice,$lte:maxPrice}
			 const pageSize = 10
			 const skip = (page - 1) * pageSize
		  if (searchQuery) {
			const searchRegex =  new RegExp(req.query.search,'i')
			query['$or'] = [
				{cardName: searchRegex,},
				{cardOverView: searchRegex},
				{cardGenre: searchRegex},
				{cardType: searchRegex},
			]
		   }
		 const giftCard = await GiftCard.find(query).sort({[sortoption]:1}).skip(skip).limit(pageSize).lean();
		const totalProduct = await GiftCard.countDocuments(query);
		if (!giftCard) {
			return res.status(401).json({ success: false, message: 'لا يوجد بطاقة للبيع' })
		  }
		 giftCard.forEach(async (card) => {
			card.isSold = undefined
			
		})
	const data = {
		giftCard,
		pagination:{
			totalProduct,
			page,
			pages:Math.ceil(totalProduct/pageSize)
		}
		
	}
	
		res.status(200).json({success:true,data})
	  } catch (error) {
	console.log('err with get all product',error);
	res.status(500).json({message:error.message})
	  }
};
export const createGiftCard = async (req,res)=>{
	const {cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty} = req.body
try {


const formattSerial =serialNumber.map(serial =>({
	serial,
	staus:'available'
}))

	let cloudinaryResponse
if(cardImg){
    cloudinaryResponse = await cloudinary.uploader.upload(cardImg, { folder: "giftCard" });
}
	const Card = await GiftCard.create({
		cardName,price,cardOverView,cardImg:cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url,serialNumber:formattSerial,cardType,cardGenre,stock,category,availibilty,seller:req.user._id
	})
	res.status(200).json({success:true,Card,message:"تم إنشاء بطاقتك بنجاح"})
} catch (error) {
	console.log('err with creating gift Card',error);
	res.status(500).json({message:error.message||' حدث خطاء ما'})
	
}
}
export const checkSerial = async (req,res)=>{
	const {serialNumber} = req.body
try {
	const check = await GiftCard.findOne({
		serialNumber:{$elemMatch:{serial:serialNumber}}
	})
	res.status(200).json({success:true,exists:check?true:false})
} catch (error) {
	console.log('err with checking serial',error);
	res.status(500).json({message:error.message||' حدث خطاء ما'})
}
}
export const deleteCard = async(req,res)=>{
	const {id} = req.params
try {
	const card = await GiftCard.findByIdAndDelete(id)
	if (!card) {
		return res.status(400).json({message:"  لا يوجد هذا المنتج حاول مرة ثانية لاحقا   " }) 
	}
	res.status(200).json({success:true,message:'تم حذف البطاقة بنجاح'})
} catch (error) {
	console.log("err with deleting",error);
	res.status(500).json({message:error.message || 'حدث خطأ ما'})
}
}
export const editCard = async(req,res)=>{
	const {id} = req.params
    const {cardName,price,cardOverView,cardImg,serialNumber,cardType,cardGenre,stock,category,availibilty} = req.body
try {
    const card = await GiftCard.findOne(
       { 
        _id:id,
       }
    )
    if(!card){
        return res.status(401).json({success:false,message:"المنتج غير موجود"})
    }
	if (card.cardImg) {
		const publicId = card.cardImg.split('/').pop().split('.')[0]
		await cloudinary.uploader.destroy(publicId)
	}
	const formattSerial =serialNumber.map(serial =>({
		serial,
		staus:'available'
	}))
	let cloudinaryResponse
if(cardImg){
    cloudinaryResponse = await cloudinary.uploader.upload(cardImg, { folder: "giftCard" });
}
    card.cardName = cardName?cardName:card.cardName
    card.cardOverView = cardOverView ? cardOverView:card.cardOverView
    card.cardImg = cardImg?(cloudinaryResponse?.secure_url && cloudinaryResponse.secure_url):card.cardImg
	card.serialNumber = formattSerial?formattSerial:card.serialNumber
    card.price = price?price:card.price
    card.cardType = cardType? cardType:card.cardType
    card.cardGenre = cardGenre? cardGenre:card.cardGenre
    card.stock = stock? stock:card.stock
	card.category = category? category:card.category
	card.availibilty = availibilty ? availibilty:card.availibilty
    await card.save()
    res.status(200).json({success:true ,message:" تم تحديث البطاقة بنجاح ",card})
    
} catch (error) {
    console.log("err with updating product",error);
    res.status(500).json({message:error.message || 'حدث خطأ ما'})
    
}
}
export const relatedCard = async(req,res)=>{
	const {id} = req.params
	try {
        const card = await GiftCard.findById(id).populate('category')
        const relatedProduct = await GiftCard.find({
            category:card.category,
            _id:{$ne:card._id}
        }).limit(4)
        res.status(200).json({message:"بطاقات مشابهة",relatedProduct})
    } catch (error) {
        console.log("err with related prouduct",error);
        res.status(500).json({success:false,message:error.message})
        
    }
}
export const getCard = async (req,res)=>{
	const {id}= req.params
	try {
		const card = await GiftCard.findById(id)
		if (!card) {
			return res.status(400).json({success:false,message:"البطاقة غير موجودة"})
		}
		  card.serialNumber.forEach(serial => {
			  serial.serial =undefined
			  serial._id = undefined
		  })
		const giftCard = {
		     card,
		}
		res.status(200).json({success:true,giftCard})
	} catch (error) {
		console.log('err with gettong car',error);
		res.status(500).json({success:false,message:error.message || 'حدث خطأ ما'})

		
	}
}
export const vipGetCard = async (req,res)=>{
	try {
		const {id}= req.params
		const giftCard = await GiftCard.findById({_id:id,seller:req.user._id})
		if (!giftCard) {
			return res.status(400).json({success:false,message:"البطاقة غير موجودة"})
		}
		const orederCount = await Order.countDocuments({giftCard:id})
		const newGiftCard = {
			giftCard,
			serialNumber:undefined,
			isSold:undefined,
		}
	  
		res.status(200).json({success:true,newGiftCard,orederCount})
	} catch (error) {
		console.log("err with get specific vip card in vip dashboard",error);
		res.status(500).json({message:error.message||'حدث خطاء ما'})
	}
}
export const getAllVipCards = async(req,res)=>{
	try {
		const giftCards = await GiftCard.find({seller:req.user._id})
		const giftCardWithOrderCount = await Promise.all(giftCards.map(async (giftCard) => {
			const totalVipCards = await CardOrder.countDocuments();
			return { ...giftCard.toObject(),serialNumber:undefined,isSold:undefined,totalVipCards };
		}))
	  
		res.json(giftCardWithOrderCount);
	} catch (error) {
		console.log("err with get all vip card in vip admin",error);
		res.status(500).json({message:error.message||'حدث خطاء ما'})
		
	}
	}
