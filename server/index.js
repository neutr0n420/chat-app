const express = require('express')
const cors = require('cors')
const http = require('http')
const {Server}  = require('socket.io')

const app = express()

app.use(cors())

const server = http.createServer(app)

app.get('/', (request, response)=>{
    response.send('<h1>Hello world</h1>')
})

const PORT = 4000

server.listen(PORT, () => `server is running on the ${PORT} port`)