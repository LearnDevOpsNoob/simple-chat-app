import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server( httpServer, {
    cors: { origin: '*' }
});

//Socket Logic
io.on('connection', (socket) => {
    //JOIN Room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`${socket.id} joined room ${roomName}`);
        socket.to(roomName).emit('userJoined', `${socket.id} - joined the room.`)
    });

    //chat message
    socket.on('chatMessage', ({ room, message }) => {
        console.log(`[${room}] ${socket.id}: ${message}`);
        io.to(room).emit('chatMessage', { sender: socket.id, message });
    });

    //Disconnect
    socket.on('diconnect', () => {
        console.log('❌ Client disconnected - ', socket.id);
    });
});


httpServer.listen(3000, () => {
  console.log('🚀 Server listening on http://localhost:3000');
});