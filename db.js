const Sequelize = require("sequelize");
const path = require("path");

const sequelize = new Sequelize('webt', '', '', {
    host: 'localhost',
    dialect: 'mysql',
   // operatorsAliases: false,
    port: 3306,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import models
db.message = require(path.join(__dirname, '/message.js'))(sequelize, Sequelize.DataTypes)


//relations




module.exports=db;