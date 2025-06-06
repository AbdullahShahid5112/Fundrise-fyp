
import { generatToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"
 


export const signup=async(req,res)=>{
  const {fullName,email,password}=req.body
    try 
    {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"all field required"})
        }

        if(password.length < 8){
            return res.status(400).json({message:"password must be atleast 8 charactor long"});
        }
        const user =await User.findOne({email})
        if (user)  return res.status(400).json({message:"Email already exist"});
        
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const newUser= new User({
            fullName,
            email,
            password:hashedPassword,
        })


        if(newUser){
            //generating jwt token
            generatToken(newUser._id,res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                password:newUser.password,
                profilePic: newUser.profilePic,
            })
        }
        else{
            res.status(400).json({message:"invalid user data"})
        }
    } 

    catch (error) {
        console.log("Error in signup controller ", error.message)
    res.status(500).json({message:"Internal Server Error"})
    }
};

export const login= async(req,res)=>{
    const{email,password}=req.body
    try {
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email password"})
        }
        // as password was hashed 
        const isPasswordCorrect=await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid email password"})
        }
        generatToken(user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,

        })
    } catch (error) {
        console.log("Error in login controller ", error.message)
    res.status(500).json({message:"Internal Server Error"})
        
    }
 
};

export const logout=(req,res)=>{

    try {
        res.cookie("jwt", "",{maxAge:0})
        res.status(200).json({message:"logout"})
    } catch (error) {
          console.log("Error in logot controller ", error.message)
    res.status(500).json({message:"Internal Server Error"})
        
    }
};

export const  updateProfile=async (req,res)=>{
    try {
        const {profilePic}=req.body;
        const userId= req.user._id;
        if(!profilePic){
            return res.status(400).json({message:"profile picture required"})
        }
        const uploadResponce= await cloudinary.uploader.upload(profilePic);
        const updateUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResponce.secure_url},{new:true})
        res.status(200).json(updateUser)

    } catch (error) {
        console.log("error in updating profile",error)
        res.status(500).json({message:"Interval server error"})
    }
};

export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}