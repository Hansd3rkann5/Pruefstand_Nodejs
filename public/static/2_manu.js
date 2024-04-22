var start = document.getElementById("start")
var motor = document.getElementById("motor")
var display = document.getElementById("display")
var main = document.getElementById("main")
var battery = document.getElementById("battery")
var button = document.getElementsByClassName("button")
var start = 2

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

function comp_choice () {
    $(".selector_small").animate({opacity:0.2}, 300)
    console.log("here")
}

function home() {
    socket.send(JSON.stringify({task:"home"}))
}