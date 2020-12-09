const http = require('http')
const express = require("express");
const upload = require("express-fileupload");
const path = require("path");
const Sequelize = require('sequelize');
const db = require('./db.js');
db.sequelize.sync();

//const message = require(path.join(__dirname, '/message.js'))(db.sequelize, Sequelize.DataTypes)

//message.sync();

const app = express();

const normalizePort = val => {
    const port = parseInt(val, 10)

    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.')
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listening', () => {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on ' + bind)
})

app.use(express.json());
app.use(express.urlencoded( { extended: false } )); // this is to handle URL encoded data
app.use(upload());

// enable static files pointing to the folder "public"
app.use(express.static(path.join(__dirname, "public")));

//upload photo 
app.post("/upload", function(request, response) {
    var images = new Array();
    if(request.files) {
        var arr;
        if(Array.isArray(request.files.filesfld)) {
            arr = request.files.filesfld;
        }
        else {
            arr = new Array(1);
            arr[0] = request.files.filesfld;
        }
        for(var i = 0; i < arr.length; i++) {
            var file = arr[i];
            if(file.mimetype.substring(0,5).toLowerCase() == "image") {
                images[i] = "/" + file.name;
                file.mv("./public" + images[i], function (err) {
                    if(err) {
                        console.log(err);
                    }
                });
            }
        }
    }
    // give the server a second to write the files
    setTimeout(function(){response.json(images);}, 1000);
});

//message history

app.get("/history",function(req,res){
   
    db.message.findAll().then(function(history){

        res.send(history);
    });
});

app.post('/message', function(req, res)
{
          message.create({
            message_text: req.body['message_text'],
        });
});
/*// Web sockets
const io = require('socket.io')(server)

io.sockets.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)

    socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

    socket.on('disconnect', () => console.log('Client has disconnected'))

    socket.on('chat', message => {
        console.log('Message received from client ->', message);
    })
})
*/
server.listen(port)