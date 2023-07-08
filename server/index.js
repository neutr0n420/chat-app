require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this
const harperSaveMessage = require('./services/harper-save-message')

// console.log(harperSaveMessage())

app.use(cors()); // Add cors middleware

const server = http.createServer(app); // Add this


const io = new Server(server, {
    cors:{
        origin: 'http://localhost:5173',
        methods: ['GET','POST']
    }
});

// Add this
// Listen for when the client connects via socket.io-client

const CHAT_BOT = 'ChatBot'
let allUser = []
let chatRoom = '' 
io.on("connection", (socket) =>{
    // console.log("user connected", socket.id)
    // adding a user to the room
    socket.on('join_room', (data)=>{
        // console.log(data)
        const {username, room} = data
        socket.join(room)
        let __createdtime__ = Date.now()
        socket.emit('receive_message',{
            message:`${username} has joined a chat room`,
            username: CHAT_BOT,
            __createdtime__
        })
        // this will be sent to the user who are currently present in the room , apart from the user that just joined.
        socket.to(room).emit('receive_message', {
            message: `${username} has joined a chat room`,
            username: CHAT_BOT,
            __createdtime__,
        })
        chatRoom = room
        allUser.push({id:socket.id, username, room})
        chatRoomUsers = allUser.filter((user) => user.room === room) 
        socket.to(room).emit('chatroom_users', chatRoomUsers)
        socket.emit('chatroom_user', chatRoomUsers)

        
    })  
    socket.on('send_message', (data)=>{
        const {username, message, room, __createdtime__} = data
        // sending the messages to all the users including the sender.
        io.in(room).emit('receive_message', data)
        harperSaveMessage(message, username, room, __createdtime__)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    })
})


server.listen(4000, () => 'Server is running on port 4000');