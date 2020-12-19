

//const Promise = require('bluebird')
const AppDB = require('../model/db')
const messageRepository = require('../model/Message')
const db_dao = new AppDB('./database.sqlite3')
const blogProjectData = {name: 'Write Node.js - SQLite Tutorial'}
const messageRepo = new messageRepository(db_dao)

var export_db = {
    createTables (){
        messageRepo.createTable();
    },
    insertIntoTable(message)
    {
        // const dao = new AppDAO('./database.sqlite3')
        // const projectRepo = new messageRepository(dao)
        messageRepo.create(message);
    },
    getAll()
    {
        messageRepo.getAll();
    }
}


module.exports = export_db