module.exports.upload_photo = function (request, response)
{
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
}