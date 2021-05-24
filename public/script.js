var sender_name;
const socket = io();
const msg_input = $("#msg");
const msg_div = $("#msgs");

window.onload = function (){
  sender_name = prompt("Enter Your Name")
  socket.emit("join",sender_name)
  msg_div.append(`
    <div class='notification'>You Joined</div>
  `)
}

$("#sendbtn").click(send_msg);


function send_msg() {
  let new_msg = {
    sender: sender_name,
    message: msg_input.val(),
    time: new Date().getHours()+" : " + new Date().getMinutes(),
  };
  msg_input.val("");
  socket.emit("new-message", new_msg);
  msg_div.append(`
        <div class='me'>
            <div class='sender'>${new_msg.sender}</div>
            <div class='msg'>${new_msg.message}</div>
            <div class='time'>${new_msg.time}</div>
        </div>
    `);
  msg_div.scrollTop(msg_div.height());
}

socket.on("got-new-msg", (msg) => {
  msg_div.append(`
        <div class='you'>
            <div class='sender'>${msg.sender}</div>
            <div class='msg'>${msg.message}</div>
            <div class='time'>${msg.time}</div>
        </div>
    `);
  msg_div.scrollTop(msg_div.height());
});

socket.on("new-user", user => {
  msg_div.append(`
    <div class='notification'>${user} joined</div>
  `)
})

socket.on("left-user", user => {
  msg_div.append(`
    <div class='notification'>${user} left</div>
  `)
})

socket.on("user-list-updated",userList=>{
  console.log(userList)
})