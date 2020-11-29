const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const message = sequelize.define("message",{
        id: { type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
            },
        text: Sequelize.STRING,
    })
    return message;
};