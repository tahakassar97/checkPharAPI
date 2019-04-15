var mongoose = require('mongoose')

const admin = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    mobile: String, 
    birthDate: String,
})

module.exports = mongoose.model('Admin', admin)