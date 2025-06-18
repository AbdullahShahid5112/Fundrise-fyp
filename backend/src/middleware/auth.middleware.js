import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRoute=async (req,res,next)=>{
    // console.log("----------req",req.cookies)
    try{
        const token=req.cookies?.jwt;
        // console.log("token",token)
        if(!token){
            return res.status(401).json({message:"Unauthorize no token provided "})
        }
        const decoded =jwt.verify(token,process.env.JWT_Secret);
        if(!decoded){
            return res.status(401).json({message:"Unauthorize Invalid token"})
        }
        const user =await User.findById(decoded.userId).select("-password");
        if (!user){
            return res.status(404).json({message:"User not found"})
        }
        req.user=user;
        next()
    }catch(error){

        console.log("error in middleware",error.message);
        res.status(500).json({message:"internal server error"})

    }
}