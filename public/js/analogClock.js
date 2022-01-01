const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const span = document.querySelector("span");

var radius = 100;
var center_x = canvas.width / 2;
var center_y = canvas.height / 2;
var angleSec = 360; // Will change in this demo
let sec = 0
let min = 0
let hour = 0

const loop = () => {
    angleSec = (sec * 6) % 360;
    angleMin = (min * 6) % 360;
    angleH = (hour * 30+(min/2)) % 360;

    // Formula seconds:
    var radSec = angleSec * Math.PI / 180;
    var xSec = center_x + radius * Math.sin(radSec);
    var ySec = center_y - radius * Math.cos(radSec);

    // Formula minutes:
    var radMin = angleMin * Math.PI / 180;
    var xMin = center_x + (radius - 10) * Math.sin(radMin);
    var yMin = center_y - (radius - 10) * Math.cos(radMin);

    // Formula hours:
    var radH = angleH * Math.PI / 180;
    var xH = center_x + (radius - 30) * Math.sin(radH);
    var yH = center_y - (radius - 30) * Math.cos(radH);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#00000fa";
    ctx.arc(center_x, center_y, radius + 20, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#00000fa";
    ctx.arc(center_x, center_y, 3, 0, Math.PI * 2);
    ctx.stroke();

    for (let i = 1; i < 13; i++) {
        var radD = ((i * 30) % 360) * Math.PI / 180;
        var xD = (center_x - 6) + radius * Math.sin(radD);
        var yD = (center_y + 6) - radius * Math.cos(radD);
        ctx.beginPath();
        ctx.font = '24px serif';
        ctx.fillStyle = 'blue';
        ctx.fillText(i, xD, yD);
    }


    //seconds
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0000ff";
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(xSec, ySec);
    ctx.stroke();

    //minutes
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#1100aa";
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(xMin, yMin);
    ctx.stroke();

    //hours
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#2200bb";
    ctx.moveTo(center_x, center_y);
    ctx.lineTo(xH, yH);
    ctx.stroke();
};

setInterval(() => {
    const date = new Date();
    sec = date.getSeconds();
    min = date.getMinutes();
    hour = date.getHours();
    const dateContainer = document.getElementById('date-display');
    if(dateContainer)dateContainer.innerText = date.toLocaleString();
    loop();
}, 1000);
