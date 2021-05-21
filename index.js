const express = require("express")
const path = require("path")
const http = require("http")
const socket = require("socket.io")
const PORT = 3000

const app = express()
const server = app.listen(PORT,()=>{
    console.log(`Server Started on Port ${PORT}`)
})

const io = socket(server)

app.use(express.static(path.join(__dirname,"frontend")))

io.on("connection",(socket)=>{
    console.log("New Client Connected")

    socket.on("new-message",(msg)=>{
        console.log("New Msg :- "+msg)
        socket.broadcast.emit("got-new-msg",msg)
    })
})