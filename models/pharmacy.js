var mongoose = require('mongoose')

const phar = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    pharmacist_name: String,
    location: String,
    openDay: [
        {
            day: String,
            time: String
        }
    ],
    mobile: String,
    phone: String
})

module.exports = mongoose.model('Pharmacy', phar)