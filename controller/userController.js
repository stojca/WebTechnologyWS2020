
const Sequelize = require('sequelize');
var db = require('../model/db');
db.sequelize.sync();

var message = require('../model/message')(db.sequelize, Sequelize.DataTypes)

message.sync();


var usersController={
    uploadImage(request,response){
        var images = new Array();
        if (request.files) {
            var arr;
            if (Array.isArray(request.files.filesfld)) {
                arr = request.files.filesfld;
            } else {
                arr = new Array(1);
                arr[0] = request.files.filesfld;
            }
            for (var i = 0; i < arr.length; i++) {
                var file = arr[i];
                if (file.mimetype.substring(0, 5).toLowerCase() == "image") {
                    images[i] = "/" + file.name;
                    file.mv("./view/" + images[i], function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            }
        }
        // give the server a second to write the files
        setTimeout(function () {
            response.json(images);
        }, 1000);
    },
    getHistory(request,response){
           db.message.findAll().then(function (history) {
               response.send(history);
           });
    },
    postMessage(request, response)
    {
        message.create({
            message_text: request.body["message_text"],
        });
    }

}

module.exports = usersController;