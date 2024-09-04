import jwt, { decode } from 'jsonwebtoken';
import User from "../model/user.js"

// export 
 export const protectRoute = async (req,res, next) => {
  try {
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error: "unautorized - No token provided"});
    }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if(!decoded){
    return res.status(401).json({ error: "unautorized - Invalid Token"});
  }

  const user = await User.findById(decoded.userId).select("-password");
   
  req.user  = user

  next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message)
    res.status(400).json({error: "internal server error"})
  }
}