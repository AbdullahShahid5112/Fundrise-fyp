import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";
import { io, getReceiverSocketId } from "../lib/socket.js";

export const getUserForSidebar = async (req, res) => {
    try {
        console.log("Request User:", req.user); // Debugging log

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        const loggedInUserId = req.user._id;
        console.log("Logged-in User ID:", loggedInUserId); // Debugging log

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        console.log("Filtered Users:", filteredUsers); // Debugging log

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserForSidebar controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user?._id; //  req.user exists

        //  Check if userToChatId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userToChatId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        //  myId is also valid
        if (!mongoose.Types.ObjectId.isValid(myId)) {
            return res.status(400).json({ message: "Invalid sender ID" });
        }

        // ✅ Fetch messages where I am the sender or receiver
        const message = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json(message); 
    } catch (error) {
        console.error("Error in getMessages controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const sendMessage= async (req,res)=>{
    try {
        const {text,image}= req.body;
        const{id: receiverId}=req.params;
        const senderId= req.user._id;

        // checking wether user is uploading image
        let  imageUrl;
        if(image){
            const uploadResponce=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponce.secure_url;
        }

        // creating message
        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        //saving to database
        await newMessage.save();
        
        
        
        
        // realtime functionalities =>socketio
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // using to so that it will broadcast to only that user
            io.to(receiverSocketId).emit("newMessage",newMessage)
            //chatStore
        }

        //sending responce back
        res.status(201).json(newMessage)
    } catch (error) {
          console.log("error in sendmessage controller ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
};

