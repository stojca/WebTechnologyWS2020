var db = require('../model/db_export');

//crate db if does not exists
//db.createTables();

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
        db.insertIntoTable(request.body["message"], request.body["session_name"]);

        setTimeout(function () {
            response.json(request.body["message"]);
        }, 1000);
    },
    importChat(request, response)
    {
        setTimeout(function () {
            response.json(db.getChat(request.body["session_name"]));
        }, 1000);

    }

}

module.exports = usersController;