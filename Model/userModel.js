const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    postal: Number
})

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
        type: Array
    },
    address: {
        required: true,
        type: addressSchema,
    },
    role: {
        type: String,
    }
},
{
    versionKey: false
})

module.exports = mongoose.model("user", userSchema);