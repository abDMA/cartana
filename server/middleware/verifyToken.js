import jwt from "jsonwebtoken";
import User from '../models/user.model.js'
export const verifyToken = async(req, res, next) => {	
	const accessToken = req.cookies.token;
		if (!accessToken) {
			return res.status(401).json({ message: "دخول غير مرخص -رمز الجلسة انتهى" });
		}

		try {
			const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;
			req.userId = decoded.userId;


		next();
	} catch (error) {
		console.log(error)
		return res.status(500).json({ success: false, message: "Server error" });
	}
};
