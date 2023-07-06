const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io'); // Add this

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

io.on("connection", (socket) =>{
    console.log("user connected", socket.id)

    socket.on('join_room', (data)=>{
        const {username, room} = data
        socket.join(room)
    })
    
   
})


server.listen(4000, () => 'Server is running on port 4000');