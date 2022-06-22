const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String
    },
    last_name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    orders: {
        required: true,
        type: Array
    }
},
{
    versionKey: false
})

module.exports = mongoose.model("user", userSchema);