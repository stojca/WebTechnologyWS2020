const Promise = require('bluebird')
const AppDB = require('../model/db')
const messageRepository = require('../model/Message')

//Create db
const db_dao = new AppDB()

const blogProjectData = {name: 'Write Node.js - SQLite Tutorial'}
const messageRepo = new messageRepository(db_dao)

var export_db = {
    createTables (){
        messageRepo.createTable();
    },
    insertIntoTable(message)
    {
        messageRepo.create(message);
    },
    getAll()
    {
        messageRepo.getAll();
    }
}


module.exports = export_db