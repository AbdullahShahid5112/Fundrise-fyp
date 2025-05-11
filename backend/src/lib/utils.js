import jwt from "jsonwebtoken"
//sending token to the user in the cookie and its age is 7 days 
//after 7 days we have to login again
export const generatToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development",
    })

    return token;
};