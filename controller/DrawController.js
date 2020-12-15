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

    $('#red').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#pink').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#fuchsia').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#orange').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#yellow').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#lime').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#green').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#blue').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#purple').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#black').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
     $('#white').get(0).addEventListener('click', function(e) { 
      onColorClick(e.target.id); }, false);
      
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

function onColorClick(color) {
  // Start a new path to begin drawing in a new color.
  context.closePath();
  context.beginPath();

  // Select the new color.
  context.strokeStyle = color;

  // Highlight selected color.
  var borderColor = 'white';
  if (color == 'white' || color == 'yellow') {
      borderColor = 'black';
  }

  $('#' + lastColor).css("border", "0px dashed white");
  $('#' + color).css("border", "1px dashed " + borderColor);

  // Store color so we can un-highlight it next time around.
  lastColor = color;
}
