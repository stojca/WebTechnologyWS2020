var db = require('../model/db_export');

//crate db if does not exists
//db.createTables();
db.insertIntoTable("prva poruka")

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
    postMessage(request, response)
    {
        console.log("create new message")
        db.insertIntoTable(request.body["message_text"]);
    }

}

module.exports = usersController;