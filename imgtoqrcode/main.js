var qrcode = new QRCode("qrcode");
var qrdiv = document.getElementById("qrcode")
var value = document.getElementById("text")
var button = document.getElementById("button")


button.onclick = function(){
    qrcode.makeCode(value.value)
}