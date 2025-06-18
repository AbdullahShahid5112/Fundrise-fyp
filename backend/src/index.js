// using express from npm i express 
import  express  from "express";
import authRoutes from "./routes/auth.route.js";
import pitchRoutes from "./routes/pitch.route.js";
import{connectDb} from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";


import cors from "cors";
import { app,server } from "./lib/socket.js";



// using it to access the port from .env
dotenv.config();


const PORT=process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))




// For signup 
app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.use("/api/pitch",pitchRoutes)


server.listen(5001, ()=>{
    console.log("server started on port "+PORT);
    connectDb();
})