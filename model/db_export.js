const Promise = require('bluebird')
const AppDB = require('../model/db')
const messageRepository = require('../model/Message')

//Create db
const db_dao = new AppDB()

const messageRepo = new messageRepository(db_dao)

var export_db = {
    createTables (){
        messageRepo.createTable();
    },
    insertIntoTable(message, session_name)
    {
        messageRepo.create(message, session_name);
    },
    getAll()
    {
        messageRepo.getAll();
    },
    getChat(session_name)
    {
        return messageRepo.getChatsBySessionName(session_name);
    }
}


module.exports = export_db