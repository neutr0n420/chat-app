require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const axios = require('axios')
const { Server } = require('socket.io'); // Add this
// const harperSaveMessage = require('./services/harper-save-message')

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
const harperSaveMessage = (message, username, room) =>{
  const dbUrl = process.env.HARPERDB_URL;
  const dbPw = process.env.HARPERDB_PW;
  if (!dbUrl || !dbPw) return null;

  var data = JSON.stringify({
    operation: 'insert',
    schema: 'realtime_chat_app',
    table: 'messages',
    records: [
      {
        message,
        username,
        room,
      },
    ],
  });

  var config = {
    method: 'post',
    url: dbUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: dbPw,
    },
    data: data,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then(function (response) {
        resolve(JSON.stringify(response.data));
      })
      .catch(function (error) {
        reject(error);
      });
  });
}


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
    
    socket.on('send_messages', (data) => {
        const { message, username, room, __createdtime__ } = data;
        io.in(room)
        io.emit('receive_message', data);
        harperSaveMessage(message, username, room, __createdtime__) // Save message in db
          .then((response) => console.log(response))
          .catch((err) => console.log(err));
      });
})




server.listen(4000, () => 'Server is running on port 4000');