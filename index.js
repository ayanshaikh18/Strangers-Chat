const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");
const PORT =  process.env.PORT || 3000;

const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});

const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

var users = {}

io.on("connection", (socket) => {
  console.log("New Client Connected");

  socket.on("join",(user)=>{
    users[socket.id] = user;
    socket.broadcast.emit("new-user",user);
  })

  socket.on("new-message", (msg) => {
    socket.broadcast.emit("got-new-msg", msg);
  });

  socket.on("disconnect", () => {
    let user = users[socket.id]
    socket.broadcast.emit("left-user",user);
    delete users[socket.id];
    console.log(user+ " Disconnected");
  });
});
