const { Show } = require('./show.model')
const { User } = require('./user.model')

//------------------many to many---------------

Show.belongsToMany(User, {through: 'Show_User'})
User.belongsToMany(Show, {through: 'Show_User'})
//------------------many to many---------------


module.exports = {Show, User}
