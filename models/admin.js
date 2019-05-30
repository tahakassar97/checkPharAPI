var mongoose = require('mongoose')

const admin = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    mobile: String, 
    birthDate: String,
    reports: [{
        pharmacist_name: String,
        post_id: String
    }]
})

module.exports = mongoose.model('Admin', admin)