//import our db, Model, DataTypes
const { db, DataTypes } = require('../db/db')

//Creating a User child class from the Model parent class
//alternative way to create a model, could also use 
/*
class Show extends Model {}
Show.init(attributes, options)
*/

//allowNull defaults to true
const Show = db.define("shows", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.ENUM("Comedy", "Drama", "Horror", "Sitcom"),
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

//.define also returns the model

//exports
module.exports = { Show }
