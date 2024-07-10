import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const authenticateUser = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ msg: "No auth token found" });
    }

    if (!authorization.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Unauthorised User" });
    }

    try {
        const token = authorization.split(" ")[1];
        const { userId } = jwt.verify(token, process.env.ACCESS_TOKEN);

        req.user = await User.findById(userId).select("-password");

        if (!req.user) {
            return res.status(401).json({ msg: "User not found" });
        }

        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ msg: "Unauthorised User1" });
    }
};

export default authenticateUser;
