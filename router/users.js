var express =  require('express');
var userControler = require('../controller/userController');

var router = express.Router();


router.post('/upload',userControler.uploadImage)
router.post('/message',userControler.postMessage)
router.post('/import_chat',userControler.importChat)

module.exports = router;