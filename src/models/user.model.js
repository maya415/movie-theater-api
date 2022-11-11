//import our db, Model, DataTypes
const { db, DataTypes } = require("../db/db");

//Creating a User child class from the Model parent class

const User = db.define("users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//exports
module.exports = { User }