$("#sendbtn").click(send_msg);

const socket = io()
const msg_input = $("#msg")
const sender = $("#sender")
const msg_div = $("#msgs")

function send_msg() {
    let new_msg = {
        "sender" : sender.val(),
        "message" : msg_input.val()
    }
    msg_input.val("")
    socket.emit("new-message",new_msg)
    msg_div.append(new_msg.message+"<br />")
}

socket.on("got-new-msg",(msg)=>{
    msg_div.append(msg.message+"<br />")
})