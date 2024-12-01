import express from "express";
import giftCardRoute from './routes/giftCard.router.js'
import paymentRoute from "./routes/payment.route.js"
import authRoute from './routes/auth.route.js'
import adminRoute from './routes/admin.route.js'
import paytabsRoute from './routes/paytabs.route.js'
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js";
const app = express();
import dotenv from "dotenv";
import cors from 'cors'
import path from "path";

dotenv.config()
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
app.use(cors({origin:`${process.env.CLIENT_URL}`,credentials:true}))
app.use(express.json({ limit: "20mb" })); // allows you to parse the body of the request
app.get('/')
app.use(cookieParser())
app.use(express.json())
app.use('/api/giftCard',giftCardRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/auth',authRoute)
app.use('/api/admin',adminRoute)
app.use('/api/paytabs',paytabsRoute)




if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/client/dist")));
	app.use(express.static(path.join(__dirname, "/client/public")));
	app.get('/payeer_2161116081.txt', (req, res) => {
		res.sendFile(path.join(__dirname, "/client/public/payeer_2161116081.txt"));
	})

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
	});
}

app.listen(PORT, () =>{ 
    console.log(`server running on port ${PORT} `);
connectDB()
})
