var mongoose = require('mongoose')

const user = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    mobile: String, 
    birthDate: String,
    asks: [{
        questions: String,
        dateTime: String,
        Type:String,
        replays: [{
            bodyReplay: String,
            dateTime: String,
            pharmacist_id: String,
            pharmacist_name: String
        }]
    }]
})

module.exports = mongoose.model('User', user)