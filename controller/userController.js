const AppDB = require('../model/db')
const messageRepository = require('../model/Message')

//Create db
const db_dao = new AppDB()

const messageRepo = new messageRepository(db_dao)

//crate db if does not exists--uncomment it if you don't have draw_db locally
//messageRepo.createTable();

var usersController={
    uploadImage(request,response){

        console.log("upload new image")

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
        //crate db if does not exists
        messageRepo.createTable();

        messageRepo.create(request.body["message"], request.body["session_name"], request.body["message_reference"])
        setTimeout(function () {
            response.json(request.body["message"]);
        }, 1000);
    },
    importChat(request, response)
    {
        //crate db if does not exists
        messageRepo.createTable();

        messageRepo.getChatsBySessionName(request.body["session_name"]).then((project) => {
            console.log(`\nRetreived project from database`)
            console.log(`project id = ${project.id}`)
            console.log(`project name = ${project.new_message}`)
            console.log(`image reference = ${project.message_reference}`)

            setTimeout(function () {
                response.json(project.new_message);
            }, 1000);
        })

    }

}

module.exports = usersController;