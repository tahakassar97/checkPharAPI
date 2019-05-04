var mongoose = require('mongoose')

const user = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    isExtrnal: Boolean,
    email: String,
    mobile: String, 
    birthDate: String,
    asks: [{
        questions: String,
        dateTime: Date,
        Type:String,
        replays: [{
            bodyReplay: String,
            dateTime: Date,
            pharmacist_id: String,
            pharmacist_name: String
        }]
    }]
})

module.exports = mongoose.model('User', user)