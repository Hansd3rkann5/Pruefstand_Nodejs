var file = document.getElementById("fileDropBox");
var start = document.getElementById("start")
var motor = document.getElementById("motor")
var display = document.getElementById("display")
var main = document.getElementById("main")
var battery = document.getElementById("battery")




file.addEventListener("dragstart", function(evt){
evt.dataTransfer.setData("DownloadURL",fileDetails);
},false);

