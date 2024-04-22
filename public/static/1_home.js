var auto = document.getElementById("auto")
var manuell = document.getElementById("manuell")
var choice_konfig = false
var choice_manu = false
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

function konfig() {
    choice_konfig = true
    console.log(choice_konfig)
    socket.send(JSON.stringify({task:"konfig"}))
}

function manu() {
    choice_manu = true
    console.log(choice_manu)
    socket.send(JSON.stringify({task:"manu"}))
}

function auto_test () {
    auto_choice = true
    console.log(auto_choice)
}

function manu_test () {
    manu_choice = true
    console.log(manu_choice)
}

