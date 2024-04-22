var auto = document.getElementById("auto")
var manuell = document.getElementById("manuell")
var auto_choice = false
var manu_choice = false

var socket = new WebSocket("ws://" + window.location.host + "/ws/");

socket.onopen = function open() {
    console.log("WebSocket connection created.")
}
socket.onmessage = function message(event) {
    var data = JSON.parse(event.data)
    if (data["hkl"] !== undefined) {
        hkl_changeColor(data["hkl"])
    }
}
if (socket.readyState == WebSocket.OPEN) {
    socket.onopen();
}

function home () {
    console.log("here")
    socket.send(JSON.stringify({task:"home"}))
}

function auto_test () {
    auto_choice = true
    socket.send(JSON.stringify({task:"auto"}))
}

function manu_test () {
    manu_choice = true
    socket.send(JSON.stringify({task:"manuell"}))
}