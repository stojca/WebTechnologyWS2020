var express =  require('express');
var userControler = require('../controller/userController');

var router = express.Router();


router.post('/upload',userControler.uploadImage)
router.post('/message',userControler.postMessage)

module.exports = router;