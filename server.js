const http = require("http");
const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const WebSocket = require("ws");
//var userRoutes = require('./router/users')

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const app = express();


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//server
const server = http.createServer(app);

//web socket server
const wss = new WebSocket.Server({ server });

const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client != ws && client.readyState == WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
  ws.on("close", function closing() {
    wss.clients.forEach(function each(client) {
      if (client != ws && client.readyState == WebSocket.OPEN) {
        client.send("close");
      }
    });
  });
});

server.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // this is to handle URL encoded data
app.use(upload());

// enable static files pointing to the folder "view,controller"

var userRoutes = require('./router/users')
app.use('/user/',userRoutes);
app.use(express.static(path.join(__dirname, "view")));
app.use(express.static(path.join(__dirname, "controller")));

module.exports = app;