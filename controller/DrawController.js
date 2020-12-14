var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var radius = 5;
var start = 0;
var end = Math.PI * 2;
var dragging = false;

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 1.5;
context.lineWidth = radius * 2;

let ws;
(function () {
  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  function init() {
    ws = new WebSocket("ws://localhost:3000");
    ws.onmessage = ({ data }) => {
      //console.log(data);
    
      if (
        data === "New user has joined the chat" ||
        data === "close" ||
        data.includes("png")  ||
        data.includes("jpg")||
        data.includes("jpeg")  ||
        data.includes("svg") 
      ) {
        return;
      }
      if (data === "true" || data === "false") {
        var isTrueSet = data === "true";
        console.log(isTrueSet);
      }
      if (!isTrueSet) {
        e = JSON.parse(data);
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        context.beginPath();
        context.arc(e.offsetX, e.offsetY, radius, start, end);
        context.fill();
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
      }
    };
  }

  init();
})();

var putPoint = function (e) {
  if (dragging) {
    context.lineTo(e.offsetX, e.offsetY);
    context.stroke();
    context.beginPath();
    context.arc(e.offsetX, e.offsetY, radius, start, end);
    context.fill();
    context.beginPath();
    context.moveTo(e.offsetX, e.offsetY);
    const draw = {
      offsetX: e.offsetX,
      offsetY: e.offsetY,
      radius: radius,
      start: start,
      end: end,
    };
    ws.send(JSON.stringify(draw));
  }
};

var engage = function (e) {
  dragging = true;
  ws.send(dragging);
  putPoint(e);
};

var disengage = function () {
  dragging = false;
  ws.send(dragging);
  context.beginPath();
};

canvas.addEventListener("mousedown", engage);
canvas.addEventListener("mousemove", putPoint);
canvas.addEventListener("mouseup", disengage);
