// using mango packages to connect and intract our database
import mongoose from "mongoose";
export const connectDb=async()=>{
    try{
        // connecting mongodb here 
       const conn= await mongoose.connect(process.env.MONGODB_URI);
       console.log(`MongoDb connected :${conn.connection.host}`);
    }catch(error){
        console.log("MongoDB connection error:",error)
    }
};