import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // frontend exact URL
        methods: ["GET", "POST"],
        credentials: true  // cookies & headers are included
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// Store online users
const userSocketMap = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    // Notify all users about online users
    io.emit("getOnlineUser", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUser", Object.keys(userSocketMap));
    });
});

export { io, app, server };
