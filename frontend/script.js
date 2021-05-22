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
    msg_div.append(`
        <div class='me'>${new_msg.sender}<br />${new_msg.message}</div>
    `)
    msg_div.scrollTop(msg_div.height());
}

socket.on("got-new-msg",(msg)=>{
    msg_div.append(`
        <div class='you'>${msg.sender}<br />${msg.message}</div>
    `)
    msg_div.scrollTop(msg_div.height());
    // $("#msgs").scrollTop($("#msgs").height());
})