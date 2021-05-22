$("#sendbtn").click(send_msg);

const socket = io();
const msg_input = $("#msg");
const sender = $("#sender");
const msg_div = $("#msgs");

function send_msg() {
  let new_msg = {
    sender: sender.val(),
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